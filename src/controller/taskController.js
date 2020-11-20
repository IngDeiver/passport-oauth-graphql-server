const Task = require("../model/Task")
const { ApolloError } = require("apollo-server-express")


const getTasks = async (args, context) => {
    try {
        const tasks = await Task.find({});
        return tasks;
    } catch (error) {
        throw new ApolloError("Error con la base de datos al listar Tasks");
    }
}

const addTask = async ({ task }, context, [token, {user}]) => {
    try {
        const newTask = new Task(task);
        const taskSaved = await newTask.save()
        return taskSaved
    } catch (error) {
        throw new ApolloError("Error con la base de datos al guardar la Task:", error.message);
    }

}

const updateTask = async ({ id, content }, context) => {
    try {
        let task = await Task.findOneAndUpdate({ _id: id }, { content }, {
            new: true
        });

        if (!task) throw new ApolloError("Task no encontrada");
        return task;

    } catch (error) {
        throw new ApolloError("Error con la base de datos al actualizar la Task");
    }
}

const deleteTask = async ({ id }, context) => {
    try {
        let task = await Task.findOneAndDelete({ _id: id }, {
            new: true
        });

        if (!task) throw new ApolloError("Task no encontrada");
        return task;

    } catch (error) {
        throw new ApolloError("Error con la base de datos al eliminar la Task");
    }
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}