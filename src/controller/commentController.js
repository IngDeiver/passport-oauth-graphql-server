const Comment = require("../model/Comment")
const { ApolloError } = require("apollo-server-express")


const getComments = async (args, context) => {
    try {
        const comments = await Comment.find({}).populate('owner').exec();
        return comments;
    } catch (error) {
        throw new ApolloError("Error con la base de datos al listar los comentarios");
    }
}

const addComment = async ({ comment }, context, [token, {user}]) => {
    try {
        const newComment = new Comment(comment);
        newComment.owner = user._id
        const commentSaved = await newComment.save()
        return commentSaved
    } catch (error) {
        throw new ApolloError("Error con la base de datos al guardar el comentario:", error.message);
    }

}

const updateComment = async ({ id, content }, context, [token, {user}]) => {
    try {
        let comment = await Comment.findOneAndUpdate({ _id: id }, { content }, {
            new: true
        });

        if (!comment) throw new ApolloError("Comentario no encontrado");
        return comment;

    } catch (error) {
        throw new ApolloError("Error con la base de datos al actualizar el comentario");
    }
}

const deleteComment = async ({ id }, context, [token, {user}]) => {
    try {
        let comment = await Comment.findOneAndDelete({ _id: id }, {
            new: true
        });

        if (!comment) throw new ApolloError("Comentario no encontrado");
        return comment;

    } catch (error) {
        throw new ApolloError("Error con la base de datos al eliminar el comentario");
    }
}

module.exports = {
    getComments,
    addComment,
    updateComment,
    deleteComment
}