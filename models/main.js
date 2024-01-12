const  mongoose  = require("mongoose")

// creating  model for the database table a basic recipe schema as mentioned below.


const RecipesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type: String,
        
    },
    ingredients: {
        type: [String], // Assuming an array of ingredient strings
        
    },
    imageurl: {
        type: String, // Assuming an array of ingredient strings
       
    },
})
const Recipe = mongoose.model("Recipe",RecipesSchema)

module.exports=Recipe