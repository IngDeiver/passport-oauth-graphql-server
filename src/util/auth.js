const { AuthenticationError} = require("apollo-server-express")

const checkAuthorizationAndProviderHeader = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization || ''
        const provider = req.headers.provider || ''
        if(!token || !provider)  return reject(new AuthenticationError("Debe tener un token de acceso y un provedor"));
        return resolve({token, provider})
    })
}

const facebookAuthProvider =  (context) => {
   return new Promise(async (resolve, reject) => {
        try {
            var user = await context.authenticate("facebook-token");
            return resolve(user)
        } catch (error) {
            return reject(new AuthenticationError(error.message))
        }
   })
}

const applyProviderAuth = (context) => {
    const provider = context.req.headers.provider
    if(provider === "facebook") return facebookAuthProvider(context);
}

module.exports = {
    checkAuthorizationAndProviderHeader,
    applyProviderAuth
}