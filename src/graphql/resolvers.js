const { getComments,
        addComment,
        updateComment,
        deleteComment} = require("../controller/commentController")

const {checkAuthorizationAndProviderHeader,
        applyProviderAuth} =  require("../util/auth")

const handleError = require("../util/handleErrors")

module.exports =  {
    Query : {
        getComments:(parent, args, context) => getComments(args, context)
    },

    Mutation : {
        addComment:(parent, args, context) => Promise.all([checkAuthorizationAndProviderHeader(context.req), applyProviderAuth(context)])
        .then(values => addComment(args, context, values)).catch(err => handleError(err)),
        
        updateComment:(parent, args, context) => Promise.all([checkAuthorizationAndProviderHeader(context.req), applyProviderAuth(context)])
        .then(values => updateComment(args, context, values)).catch(err => handleError(err)),
        
        deleteComment:(parent, args, context) => Promise.all([checkAuthorizationAndProviderHeader(context.req), applyProviderAuth(context)])
        .then(values => deleteComment(args, context, values)).catch(err => handleError(err)),
    }

}