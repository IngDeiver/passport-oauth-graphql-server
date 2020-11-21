const { getComments,
        addComment,
        updateComment,
        deleteComment} = require("../controller/commentController")

const {login, register} = require("../controller/userController")

const {checkAuthorizationAndProviderHeader,
        applyProviderAuth} =  require("../services/authService")

const handleError = require("../util/handleErrors")



module.exports =  {
    Query : {
        getComments:(parent, args, context) => getComments(args, context),
        login:(parent, args, context) => login(args, context),
        register:(parent, args, context) => register(args)
    },

    Mutation : {
        /*if exist once a error in checkAuthorizationAndProviderHeader or applyProviderAuth 
        the .catch make a "throw" error to client */

        addComment:(parent, args, context) => Promise.all([checkAuthorizationAndProviderHeader(context.req), applyProviderAuth(context)])
        .then(values => addComment(args, context, values)).catch(err => handleError(err)),
        
        updateComment:(parent, args, context) => Promise.all([checkAuthorizationAndProviderHeader(context.req), applyProviderAuth(context)])
        .then(values => updateComment(args, context, values)).catch(err => handleError(err)),
        
        deleteComment:(parent, args, context) => Promise.all([checkAuthorizationAndProviderHeader(context.req), applyProviderAuth(context)])
        .then(values => deleteComment(args, context, values)).catch(err => handleError(err)),
    }

}