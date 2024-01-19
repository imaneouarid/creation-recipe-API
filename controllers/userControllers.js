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
module.exports.signup_post = async (req, res) => {
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


module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const auth = await bcrypt.compare(password, user.password);

            if (auth) {
                const token = createToken(user._id);
                res.status(200).json({ user, token });
            } else {
                res.status(401).json({ message: 'user not exist' });
            }
        } else {
            res.status(401).json({ message: 'user not exist' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
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