const mongoose = require("mongoose");

// the schema enforces the shape of the documents we create/update in mongodb
// shape refers to the keyNames/Value Datatypes (mongoose syntax for reference)
// for dataTypes, String, Boolean, Number, etc... 
const fruitSchema = new mongoose.Schema ({
    name: String,
    isReadyToEat: Boolean
});


// we create the model object! Which we use to export in order to use in other files
// this object can perform our CRUD operations, .create, .find, .findOne, .findById, findOneByIdAndUpdate
const FruitModel = mongoose.model('Fruit', fruitSchema);

module.exports = FruitModel;