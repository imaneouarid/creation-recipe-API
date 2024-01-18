const  mongoose  = require("mongoose")

// create model for the database table  recipe schema .


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
        type: String, 
       
    },
})
const Recipe = mongoose.model("Recipe",RecipesSchema) //creer mongoose model  collection

module.exports=Recipe;


