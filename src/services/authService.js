const { AuthenticationError} = require("apollo-server-express")
const {JsonWebTokenError} = require("jsonwebtoken")

const checkAuthorizationAndProviderHeader = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization || req.headers.access_token || ''
        const provider = req.headers.provider || ''
        if(!token || !provider)  return reject(new AuthenticationError("You need acces token and provider"));
        return resolve({token, provider})
    })
}

const facebookAuthProvider =  (context) => {
   return new Promise(async (resolve, reject) => {
        try {
            const {user, info} = await context.authenticate("facebook-token");
            if(info) throw new AuthenticationError(info)
            return resolve(user)
        } catch (error) {
            return reject(new AuthenticationError(error.message))
        }
   })
}

const googleAuthProvider =  (context) => {
    return new Promise(async (resolve, reject) => {
         try {
             const {user, info} = await context.authenticate("google-token");
             if(info) throw new AuthenticationError(info)
             return resolve(user)
         } catch (error) {
             return reject(new AuthenticationError(error.message))
         }
    })
 }


 
const ownerAuth =  (context) => {
    return new Promise(async (resolve, reject) => {
         try {
             const {user, info} = await context.authenticate('jwt', { session: false })
             if(info instanceof JsonWebTokenError) throw new AuthenticationError(info)
             return resolve(user)
         } catch (error) {
             return reject(new AuthenticationError(error.message))
         }
    })
 }
 
const applyProviderAuth = (context) => {
    const provider = context.req.headers.provider
    if(provider === "facebook") return facebookAuthProvider(context);
    if(provider === "google") return googleAuthProvider(context);
    if(provider === "owner") return ownerAuth(context);
}

module.exports = {
    checkAuthorizationAndProviderHeader,
    applyProviderAuth
}