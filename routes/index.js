//Routes/index
const express = require("express");
const Recipe =require ("../models/main")
const { requireAuth } = require('../middleware/authMiddleware');

const userController = require('../controllers/userControllers');




const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Creates a new user account with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *                 minLength: 6
 *     responses:
 *       '201':
 *         description: User successfully created. Returns the user details and a token.
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: 'some_user_id'
 *                 email: 'user@example.com'
 *               token: 'some_jwt_token'
 *       '400':
 *         description: Bad Request. Returns error details.
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 email: 'Invalid email format'
 *                 password: 'Password must be at least 6 characters long'
 */



router.post('/signup', userController.signup_user);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user based on the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *     responses:
 *       '200':
 *         description: User successfully authenticated. Returns the user details and a token.
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: 'some_user_id'
 *                 email: 'user@example.com'
 *               token: 'some_jwt_token'
 *       '401':
 *         description: Unauthorized. Returns a message indicating incorrect email or password.
 *         content:
 *           application/json:
 *             examples:
 *               incorrectEmail:
 *                 value:
 *                   message: 'Your email is incorrect'
 *               incorrectPassword:
 *                 value:
 *                   message: 'Your password is incorrect'
 *       '500':
 *         description: Internal Server Error. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 *               error: 'Error details...'
 */

router.post('/signin', userController.login_user);



// Define a simple route user

// Route to create a new recipe
// Route to create a new recipe

router.put('/ModifyUser', userController.Modify_user);


/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Create a new recipe
 *     description: Endpoint to create a new recipe.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the recipe.
 *               description:
 *                 type: string
 *                 description: The description of the recipe.
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of ingredients for the recipe.
 *               imageurl:
 *                 type: string
 *                 description: The URL of the image associated with the recipe.
 *     responses:
 *       '201':
 *         description: Recipe successfully created. Returns the details of the created recipe.
 *         content:
 *           application/json:
 *             example:
 *               _id: 'some_recipe_id'
 *               name: 'Example Recipe'
 *               description: 'A delicious recipe'
 *               ingredients: ['Ingredient 1', 'Ingredient 2']
 *               imageurl: 'https://example.com/recipe-image.jpg'
 *       '500':
 *         description: Internal Server Error. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 *               error: 'Error details...'
 */

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

  /**
 * @swagger
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     description: Retrieve a list of all recipes.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response. Returns an array of recipes.
 *         content:
 *           application/json:
 *             example:
 *               - _id: 'some_recipe_id_1'
 *                 name: 'Recipe 1'
 *                 description: 'A delicious recipe'
 *                 ingredients: ['Ingredient 1', 'Ingredient 2']
 *                 imageurl: 'https://example.com/recipe-1-image.jpg'
 *               - _id: 'some_recipe_id_2'
 *                 name: 'Recipe 2'
 *                 description: 'Another delicious recipe'
 *                 ingredients: ['Ingredient A', 'Ingredient B']
 *                 imageurl: 'https://example.com/recipe-2-image.jpg'
 *       '404':
 *         description: Recipes not found. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Recipes not found'
 *       '500':
 *         description: Internal Server Error. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 *               error: 'Error details...'
 */

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



/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     description: Retrieve details about a recipe based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       '200':
 *         description: Successful response. Returns the details of the requested recipe.
 *         content:
 *           application/json:
 *             example:
 *               _id: 'some_recipe_id'
 *               name: 'Example Recipe'
 *               description: 'A delicious recipe'
 *               ingredients: ['Ingredient 1', 'Ingredient 2']
 *               imageurl: 'https://example.com/recipe-image.jpg'
 *       '404':
 *         description: Recipe not found. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Recipe not found'
 *       '500':
 *         description: Internal Server Error. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 *               error: 'Error details...'
 */

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

/**
 * @swagger
 * /recipe/{id}:
 *   delete:
 *     summary: Delete recipe by ID
 *     description: Delete a recipe based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       '200':
 *         description: Recipe successfully deleted. Returns a success message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Recipe successfully deleted'
 *       '404':
 *         description: Recipe not found. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Recipe not found'
 *       '500':
 *         description: Internal Server Error. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 *               error: 'Error details...'
 */

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

  /**
 * @swagger
 * /recipe/{id}:
 *   put:
 *     summary: Update recipe by ID
 *     description: Update the details of a recipe based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *       - in: body
 *         name: body
 *         description: Updated recipe details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 imageurl:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Recipe successfully updated. Returns the details of the updated recipe.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Recipe updated successfully'
 *               recipe:
 *                 _id: 'some_recipe_id'
 *                 name: 'Updated Recipe'
 *                 description: 'An updated delicious recipe'
 *                 ingredients: ['Updated Ingredient 1', 'Updated Ingredient 2']
 *                 imageurl: 'https://example.com/updated-recipe-image.jpg'
 *       '404':
 *         description: Recipe not found. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Recipe not found'
 *       '500':
 *         description: Internal Server Error. Returns an error message.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 *               error: 'Error details...'
 */
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

