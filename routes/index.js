//Routes/index
const express = require("express");
const Recipe =require ("../models/main")
const { requireAuth } = require('../middleware/authMiddleware');

const userController = require('../controllers/userControllers');




const router = express.Router();

router.post('/signup', userController.signup_post);
router.post('/signin', userController.login_post);



// Define a simple route user

// Route to create a new recipe
// Route to create a new recipe
router.post('/recipe', requireAuth, async (req, res) => {
    try {
      // Assuming req.body contains the data for the new recipe
      const { name, description, ingredients, imageurl } = req.body;
  
      // Create a new recipe using the Recipe model
      const newRecipe = new Recipe({
        name,
        description,
        ingredients,
        imageurl,
      });
  
      // enregistrer 
      const savedRecipe = await newRecipe.save();
  
      // Send the saved recipe as a JSON response
      res.status(201).json(savedRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/recipe',requireAuth, async (req, res) => {
    try {
        const recipe = await Recipe.find()
        console.log(!recipe);

        if(!recipe){
            res.status(404).send({message:'Not Found '});

        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error ');
    }
});





router.get('/recipe/:id',requireAuth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.delete('/recipe/:id',requireAuth, async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      // If the recipe exists, you can now delete it
      await recipe.deleteOne();
  
      res.json({ message: ` Recipe   ${recipe.name}  is deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
  });
  router.put('/recipe/:id',requireAuth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Update the recipe properties based on the request body
        // Assuming req.body contains the updated data
        recipe.name = req.body.name || recipe.name;
        recipe.description = req.body.description || recipe.description;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.imageurl = req.body.imageurl || recipe.imageurl;

        // Save the updated recipe
        const updatedRecipe = await recipe.save();

        res.json({ message: 'Recipe updated successfully ', recipe: updatedRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
  




// export const deleteStudentByID = (req,res) => {
//     Student.remove({_id:req.params.studentID},(err,contact) => {
//         if(err){
//             res.send(err)
//         }else{
//             res.json({message:"Successfully deleted student from records"})
//         }
//     })
// }

module.exports = router;

