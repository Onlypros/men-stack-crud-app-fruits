const express = require('express')
const router = express.Router()

// Importing the model
// model by convention is uppercase and singular (in all programming languages pretty much)
const FruitModel = require('../models/fruit')

router.put('/:fruitId', async function(req, res){
	// {new: true} says return the updatedDoc
	console.log(req.body, " <== req.body")
	// if(req.body.isReadyToEat === 'on'){
	// 	req.body.isReadyToEat = true;
	// } else {
	// 	req.body.isReadyToEat = false
	// }

	// the boolean operate !! is forcing the isReadyToEat to its boolean value!
	req.body.isReadyToEat = !!req.body.isReadyToEat
	// findByIdByUpdate(id, objectYouWantToUpdate(the form object typicall), optionsObject)
	const fruitDoc = await FruitModel.findByIdAndUpdate(req.params.fruitId, req.body, {new: true})


	// redirect to the show route,
	// tell the client to make a get request to the show route
	res.redirect(`/fruits/${req.params.fruitId}`)
})


router.delete('/:fruitId',async function(req, res){

	// go to the database find the fruit and delete it!
	const deletedFruit = await FruitModel.findByIdAndDelete(req.params.fruitId)

	res.redirect('/fruits'); // redirect references an endpoint
	// not a filepath
})

// ENDPOINTS  ====================================
// In order to create a Fruit
router.get('/', async function(req, res){
	// render is assuming
	// inside of views we have a fruits folder
	// with a new.ejs file inside of it!

	const allFruitDocs = await FruitModel.find({})
	console.log(allFruitDocs)

	// second argument to render is an object
	// we choose the key and value
	// keyname will become a variable name inside of the 1st argument ('fruits/index.ejs') ejs page
	res.render('fruits/index.ejs', {fruitDocs: allFruitDocs})
})

// the client needs to make a request to get a form
// GET Request
router.get('/new', function(req, res){
	// render is assuming
	// inside of views we have a fruits folder
	// with a new.ejs file inside of it!
	res.render('fruits/new.ejs')
})

// the show route must be defined after the new route/ because
// :fruitID is a catch all and would catch new in the request
router.get('/:fruitId', async function(req, res){

	// go to the database and get the fruit by its id
	const fruitDoc = await FruitModel.findById(req.params.fruitId)
	console.log(fruitDoc, " <--- fruitDoc")

	res.render('fruits/show.ejs', {fruit: fruitDoc})
})

router.get('/:fruitId/edit', async function(req, res){


	const fruitDoc = await FruitModel.findById(req.params.fruitId)

	res.render('fruits/edit.ejs', {fruit: fruitDoc})
})

// then client need to submit the form with the data representing the new fruit
// POST Request
router.post('/', async function(req, res){

	console.log(req.body, ' <- contents of the form!')
	// take the contents of the form and put them in the database!
	if(req.body.isReadyToEat === 'on'){
		req.body.isReadyToEat = true;
	} else {
		req.body.isReadyToEat = false
	}

	// Use our model to add it to the database!
	const createdFruit = await FruitModel.create(req.body)
	console.log(createdFruit, " <- this is the fruit we created should have _id property from mongodb")

	res.redirect('/fruits'); // we always redirect on our post routes to one of our get routes
	// its your choice, what page do you want the user to see after you create something
	// /fruits/new is refering to an endpoint not a filepath
	// router.get(/fruits/new)
	// The server is saying client make a GET request to /fruits/new
})



module.exports = router