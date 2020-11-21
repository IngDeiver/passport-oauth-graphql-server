const { AuthenticationError} = require("apollo-server-express")
const {JsonWebTokenError} = require("jsonwebtoken")

// check  type provider from provider header
const checkAuthorizationAndProviderHeader = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization || req.headers.access_token || ''
        const provider = req.headers.provider || ''
        if(!token || !provider)  return reject(new AuthenticationError("You need acces token and provider"));
        return resolve({token, provider})
    })
}

// apply auth facebook middleware
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

// apply auth Google middleware
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


 // apply jwt  middleware for get jwt token from header and get local user
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
 
// detected provider and apply your respective middleware auth (facebook, google or owner)
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