const Comment = require("../model/Comment")
const { ApolloError, ForbiddenError} = require("apollo-server-express")


const getComments = async (args, context) => {
    try {
        const comments = await Comment.find({}).populate('owner').exec();
        return comments;
    } catch (error) {
        throw new ApolloError(`${error.message}`);
    }
}

const addComment = async ({ comment }, context, [token, user]) => {
    try {
        //create comment and owner
        const newComment = new Comment(comment);
        newComment.owner = user._id
        // save comment
        const commentSaved = await newComment.save()
        return commentSaved
    } catch (error) {
        throw new ApolloError(`${error.message}`);
    }

}

const updateComment = async ({ id, comment }, context, [token, user]) => {
    try {
        // find comment
        let commentUpdate = await Comment.findOne({ _id: id }).exec();
        
        if (!commentUpdate) throw new ApolloError("Comment not found");
        if(!user._id.equals(commentUpdate.owner._id)) throw new ForbiddenError("You don't have permission")
        
        // update and save comment
        commentUpdate.content = comment.content
        await commentUpdate.save()
        return commentUpdate;

    } catch (error) {
        if(error instanceof ForbiddenError) throw new ForbiddenError(`${error.message}`);
        throw new ApolloError(`${error.message}`);
    }
}

const deleteComment = async ({ id }, context, [token, user]) => {
    try {
        // find comment
        let comment = await Comment.findOne({ _id: id }).exec()

        if (!comment) throw new ApolloError("Comment not found");
        if(!user._id.equals(comment.owner._id)) throw new ForbiddenError("You don't have permission")

        // delete comment
        await comment.remove()
        return comment;

    } catch (error) {
        if(error instanceof ForbiddenError) throw new ForbiddenError(`${error.message}`);
        throw new ApolloError(`${error.message}`);
    }
}

module.exports = {
    getComments,
    addComment,
    updateComment,
    deleteComment
}