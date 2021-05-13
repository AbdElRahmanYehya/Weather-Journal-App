  
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening());

function listening() {
	console.log(port);
}

app.get('/all', function (req, res) {
  res.send(projectData);
  console.log("get all");
})

//data = [];

app.post('/addMovie', function (req, res) {
  //res.send('POST request to the homepage');
  //console.log("post addMovie");
  //data.push(req.body);
  data = req.body;
  //console.log(data);
  projectData["temperature"] = data.temperature;
  projectData["date"] = data.date;
  projectData["userResponse"] = data.userResponse;
  console.log(projectData);
})

app.post('/newAdd', function (req, res) {
	newEntry = {
		temperature: req.body.temperature,
		date: req.body.date,
		userResponse: req.body.userResponse
	}
	console.log(newEntry);
})