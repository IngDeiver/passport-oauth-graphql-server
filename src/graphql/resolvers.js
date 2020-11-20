const { AuthenticationError } = require("apollo-server-express")
const { getTasks,
        addTask,
        updateTask,
        deleteTask} = require("../controller/taskController")

const checkAuthorizationHeader = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization || ''
        const provider = req.headers.provider || ''
        if(!token || !provider)  reject("Debe tener un token de acceso y un provedor");
        resolve({token, provider})
    })
}

const facebookAuthProvider =  (context) => {
   return new Promise(async (resolve, reject) => {
        try {
            var user = await context.authenticate("facebook-token");
            resolve(user)
        } catch (error) {
            reject(error.message)
        }
   })
}

const applyProviderAuth = (context) => {
    const provider = context.req.headers.provider
    if(provider === "facebook") return facebookAuthProvider(context);
}

module.exports =  {
    Query : {
        getTasks:(parent, args, context) => getTasks(args, context)
    },

    Mutation : {
        addTask:(parent, args, context) => Promise.all([checkAuthorizationHeader(context.req), applyProviderAuth(context)])
        .then(values => addTask(args, context, values)).catch(err => {throw new AuthenticationError(err)}),
        
        updateTask:(parent, args, context) => updateTask(args, context),
        deleteTask: (parent, args, context) => deleteTask(args, context)
    }

}