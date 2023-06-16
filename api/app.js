// load express into the app
const express = require("express");
const app = express();
const mongoose = require("./db/mongoose");
const bodyParser = require("body-parser");

/* LOAD IN THE MONGOOSE MODELS */
const { List, Task } = require("./db/models");

/* LOAD BODY-PARSER MIDDLEWARE  */
// instructing Express to use body-parser to parse JSON payloads in the request body
app.use(bodyParser.json());

/**
 * This MIDDLEWARE sets the necessary headers for enabling Cross-Origin Resource Sharing (CORS).
 * CORS is a security mechanism implemented in web browsers that restricts cross-origin requests,
 * i.e., requests made from a different domain, port, or protocol.
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/********************************* ROUTE HANDLERS *************************************************/
/*********************
 *    LIST ROUTES    *
 ********************/
/**
 * GET /lists
 * Purpose: Get all lists
 * Action: It will return an array of all the lists in the database
 */
app.get("/lists", (req, res) => {
  // Express route handler using the HTTP GET method: get all the docs from List then res to the client
  // Empty array obj means no condition, fetches all documents in the list
  List.find({}).then((list) => {
    res.send(list);
  });
});

/** GET one list with specific id /lists
 * Purpose: Get all lists
 * Action: It will return an array of all the lists in the database
 */
app.get("/lists/:listId", (req, res) => {
  List.findOne({ _id: req.params.listId }).then((list) => {
    res.send(list);
  });
});

/** POST /lists
 * Purpose: Create a list
 * Action: Create a new list and return the new list back to the user, including the id
 */
app.post("/lists", (req, res) => {
  // get the list title that passed in the JSON body => need to install middleware called body parser
  let title = req.body.title;
  // create new list with title field
  let newList = new List({ title });
  // save the newList to MongoDB database then return that list to the client
  newList.save().then((listDoc) => {
    // the full list document is returned, including id
    res.send(listDoc);
  });
});

/**
 * PATCH /lists/:id
 * Purpose: Update the list (PATCH request could be used to update PARTIAL list)
 * Action: Update the old value with the new values specified in the JSON body of the request (no need to provide all fields)
 */
app.patch("/lists/:id", (req, res) => {
  // The list information (fields) will be passed in via the JSON request body
  // pass in the id, update the list that it found using the first param as the condition, with the req.body obj
  List.findOneAndUpdate({ _id: req.params.id, $set: req.body }).then(
    (updatedList) => {
      res.sendStatus(200); //send the status code of 200 which corresponds to a successful request.
      // res.send(updatedList);
    }
  );
});

/**
 * DELETE /lists/:id
 * Purpose: Delete the record of the list
 * Action: delete the record with the provided id in the url
 */
app.delete("/lists/:id", (req, res) => {
  List.findOneAndRemove({ _id: req.params.id, $set: req.body }).then(
    (removedList) => {
      res.send(removedList);
    }
  );
});
/** This is the end of List routes **/

/*********************
 *    TASK ROUTES    *
 ********************/
/** GET all the task /lists/tasks
 * Purpose: Get all tasks from list
 * Action: It will return an array of all the tasks with the specific listId in the database
 */
app.get("/lists/:listId/tasks", (req, res) => {
  // Express route handler using the HTTP GET method: get all the docs from tasks then res to the client
  // Pass in the listId as a condition, fetches all tasks with that listId
  Task.find({ _listId: req.params.listId }).then((task) => {
    res.send(task);
  });
});

/** GET one specific task from id and listId /lists/:listId/tasks/:id
 * Purpose: Get one specific task from id and listId
 * Action: It will return a task with specific id and listId in the database
 */
app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  // Express route handler using the HTTP GET method: get all the docs from tasks then res to the client
  // Pass in the listId as a condition, fetches all tasks with that listId
  Task.findOne({ _listId: req.params.listId, _id: req.params.taskId }).then(
    (task) => {
      res.send(task);
    }
  );
});

/** POST /lists/:listId/tasks
 * Purpose: Create a task that associate with the passed in listID
 * Action: Create a new list and return the new list back to the user, including the id
 */
app.post("/lists/:listId/tasks", (req, res) => {
  // get the task title that passed in the JSON body
  let title = req.body.title;
  // create new task within the passed in listId
  let newTask = new Task({ title, _listId: req.params.listId });
  // save the newList to MongoDB database then return that list to the client
  newTask.save().then((taskDoc) => {
    // the full task document is returned, including id
    res.send(taskDoc);
  });
});

/**
 * PATCH /lists/:id
 * Purpose: Update the list (PATCH request could be used to update PARTIAL list)
 * Action: Update the old value with the new values specified in the JSON body of the request (no need to provide all fields)
 */
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  // The list information (fields) will be passed in via the JSON request body
  // pass in the id, update the list that it found using the first param as the condition, with the req.body obj
  Task.findOneAndUpdate(
    { _id: req.params.taskId, _listId: req.params.listId },
    { $set: req.body }
  ).then((updatedList) => {
    res.sendStatus(200); //send the status code of 200 which corresponds to a successful request.
    // res.send(updatedList);
  });
});

/**
 * DELETE /lists/:id
 * Purpose: Delete the record of the list
 * Action: delete the record with the provided id in the url
 */
app.delete("/lists/:listId/tasks/:id", (req, res) => {
  Task.findOneAndRemove(
    { _id: req.params.taskId, _listId: req.params.listId },
    { $set: req.body }
  ).then((removedList) => {
    res.send(removedList);
  });
});
/** This is the end of Task routes **/
// make it listen to the port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
