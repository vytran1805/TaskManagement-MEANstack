// load express into the app
const express = require("express");
const app = express();
const { mongoose } = require("./db/mongoose");
const bodyParser = require("body-parser");

/* LOAD IN THE MONGOOSE MODELS */
const { List, Task } = require("./db/models");

/* LOAD MIDDLEWARE BODY-PARSER */
// instructing Express to use body-parser to parse JSON payloads in the request body
app.use(bodyParser.json());
/* ROUTE HANDLERS */

/* LIST ROUTES*/
// sets up a route handler for the HTTP GET request on the root URL ("/")

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

/**
 * POST /lists
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
});

/**
 * DELETE /lists/:id
 * Purpose: Delete the record of the list
 * Action: delete the record with the provided id in the url
 */
app.patch("/lists/:id", (req, res) => {});
// make it listen to the port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
