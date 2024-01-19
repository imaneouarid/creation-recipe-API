// middleware/authMiddleware.js
// authMiddleware.js
const jwt = require('jsonwebtoken');
const your_secret_key ='hiimanezwinaaa'


const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
      console.log('Token:', token);


  if (token) {
    jwt.verify(token.split(" ")[1], your_secret_key, (err, decodedToken) => {

        console.log('Decoded Token:', decodedToken);

      if (err) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized noo' });
  }
};

module.exports = { requireAuth };



// const requireAuth = (req, res, next) => {
//     const token = req.headers.authorization;

//     console.log('Token:', token);

//     if (token) {
//         jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
//             console.log('Decoded Token:', decodedToken);

//             if (err) {
//                 res.status(401).json({ message: 'Unauthorized' });
//             } else {
//                 req.user = decodedToken;
//                 next();
//             }
//         });
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };
