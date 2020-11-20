const { AuthenticationError } = require("apollo-server-express")
const { getComments,
        addComment,
        updateComment,
        deleteComment} = require("../controller/commentController")

const {checkAuthorizationAndProviderHeader,
        applyProviderAuth} =  require("../util/auth")

module.exports =  {
    Query : {
        getComments:(parent, args, context) => getComments(args, context)
    },

    Mutation : {
        addComment:(parent, args, context) => Promise.all([checkAuthorizationAndProviderHeader(context.req), applyProviderAuth(context)])
        .then(values => addComment(args, context, values)).catch(err => {throw new AuthenticationError(err)}),
        
        updateComment:(parent, args, context) => updateComment(args, context),
        deleteComment: (parent, args, context) => deleteComment(args, context)
    }

}