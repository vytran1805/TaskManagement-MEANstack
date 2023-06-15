const mongoose = require("mongoose");
/**
 * Create the schema named ListSchema
 */
const ListSchema = new mongoose.Schema({
  // define the field called `title` of type String that this schema will have
  title: {
    type: String,
    required: true,
    minlengt: 1,
    trim: true,
  },
});

/**
 * Create the model named `list` of the Schema
 * This model can be used to perform database operations in the MongoDB collection
 */
const List = mongoose.model("List", ListSchema);

module.exports = { List };
