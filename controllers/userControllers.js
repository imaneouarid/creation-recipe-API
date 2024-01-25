// userController.js

const User = require("../models/userModels");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const your_secret_key ='hiimanezwinaaa'


const handleErrors = (err) => {
    let errors = {};

    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;

    }

    if (err.name === 'ValidationError') {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;

        });
    }

    return errors;
};

const createToken = (id) => {
    return jwt.sign({ id }, your_secret_key, { expiresIn: '1d' });
};






module.exports.signup_user = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.status(201).json({ user, token });
    }
    catch(err) {
       console.error(err);

      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
   
  }

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



module.exports.login_user = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const auth = await bcrypt.compare(password, user.password);

            if (auth) {
                const token = createToken(user._id);
                res.status(200).json({ email:user.email, token });
            } else {
                res.status(401).json({ message: 'ur password is incorrect' });
            }
        } else {
            res.status(401).json({ message: 'ur email is incorrect' });
        }
       
       
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


module.exports.Modify_user = async (req, res) => {
    const userId = req.params.id; // Assuming you're passing the user ID as a URL parameter
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user information based on the request body
        user.email = email || user.email;
        user.password = password || user.password;

        // Save the updated user
        const updatedUser = await user.save();

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};















// module.exports.signup_post = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.create({ email, password });
//         const token = createToken(user._id);

//         res.status(201).json({ user, token });
//     } catch (err) {
//         console.error(err);
//         const errors = handleErrors(err);

//         res.status(500).json({ message: 'Internal Server Error', error: err.message });
//     }
// };