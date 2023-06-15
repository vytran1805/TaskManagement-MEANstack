const mongoose = require("mongoose");
const { List } = require("./list.model");
/**
 * Create the schema named taskSchema
 */
const TaskSchema = new mongoose.Schema({
  // define the field called `title` of type String that this schema will have
  title: {
    type: String,
    required: true,
    minlengt: 1,
    trim: true,
  },
  _listId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

/**
 * Create the model named `task` of the Schema
 * This model can be used to perform database operations in the MongoDB collection
 */
const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };
