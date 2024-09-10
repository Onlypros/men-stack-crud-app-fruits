const dotenv = require('dotenv')
dotenv.config(); // this line of code allows us to read any of our environment variables
// in any file in the application by using process.env.VARIABLE_NAME (in the .env file)
const express = require('express');
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

const path = require("path");

const authController = require("./controllers/auth.js");

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI)

// log that we are connected to the db
mongoose.connection.on('connected', function(){
	console.log(`Connected to Mongodb ${mongoose.connection.name}`)
})

// Importing the model
// model by convention is uppercase and singular (in all programming languages pretty much)
const FruitModel = require('./models/fruit')

// import the controller
const fruitCtrl = require('./controllers/fruits')

// Middleware =================================
// this middleware parases the form requests
// and lets us access req.body (contents of the form)
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(morgan('dev')) // this will print the http method and endpoint
// of each request coming into the server
app.use(express.static(path.join(__dirname, "public")));

app.use('/fruits', fruitCtrl)

// ENDPOINTS 
// Landing Page aka the Root Route
app.get('/', function(req, res){

	// index.ejs is referencing views/index.ejs
	// no need to put views ever!
	res.render('index.ejs')
})

app.listen(3000, function(){
	console.log("express server is listening for requests on Port:3000")
})