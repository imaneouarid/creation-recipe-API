// controller 
const User = require("../models/userModels");
// handle errors
const handleErrors = (err)=>{
    console.log(err.message,err.code);
    let erroe = { email: '', password : ''};

// validation errors 
if (err.message.includes('user validation failed')){
     object.values(err.errors).forEach(({properties}) => {
        errors[properties.path]= properties.message;
     });
     console.log( err.propr);

     
}
}

module.exports.signup_get = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send('user login');

  }
  module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.create({ email, password });
      res.status(201).json(user);
    }
    catch(err) {
        console.log(err)
        
    //   const errors = handleErrors(err);
      res.status(400).send('errror not created');
    }  }
  
  module.exports.signin_get = (req, res) => {
    res.send('login');
  }
  

  module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;
  
    console.log(email, password);
    res.send('user login');
  }















  //   module.exports.signup_post = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.create({ email, password });
//       res.status(201).json(user);
//     }
//     catch(err) {
//       const errors = handleErrors(err);
//       res.status(400).json({ errors });
//     }
   
//   }
  