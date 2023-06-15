/* This file will handle connection logic to the MongoDB database */
const mongoose = require("mongoose");

/**
 * set the Mongoose promise library to use the global Promise implementation.
 * NOTE: Promises are a way to handle asynchronous operations in JavaScript.
 */
mongoose.Promise = global.Promise;

/**
 * Connect to the TaskManager database, catch error if any
 * NOTE: 27017 is the default port of MongoDB
 */
mongoose
  .connect("mongodb://localhost:27017/TaskManager", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((e) => {
    console.log("Error while attempting to connect to the MongoDB");
  });

/**
 * Prevent deprectation warnings from MongoDB native driver
 */
// mongoose.set("useCreateIndex", true);
// mongoose.set("useFindAnModify", false);

/* export he Mongoose obj */
module.exports = { mongoose };
