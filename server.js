// server.js

const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/index');
const { requireAuth } = require('./middleware/authMiddleware');
const cookieParser = require("cookie-parser");
const  swaggerDocs  = require("./docs/swagger");

const app = express();
swaggerDocs(app, port)

// Middleware
app.use(express.json());  // Use the built-in JSON parsing middleware
app.use(cookieParser());  // Use the built-in JSON parsing middleware

// Use the defined router
app.use('/', router);

// Connect to the database
mongoose.connect("mongodb://localhost:27017/Recipes")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Not connected to the database " + err);
  });

// Listen to port
app.listen(3000, () => console.log("Server is running on port 3000"));





























// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();



// Create a basic route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const mongoose = require('mongoose');

// Define a schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// Create a model
// const User = mongoose.model('User', userSchema);




// const express = require("express")
// const main=express();

// const port = 3000;
// main.get("/",(req,res)=>{
//     res.send("hi")
// })
// main.listen(port,()=>{
//     console.log("Server is running on port",port);

// }) 
//     main.use(express.json()) //convertir data to json
//     main.post("/imane",(req,res)=>{
//         const {name} = req.body
//         const {age} = req.body
        
        

//     res.send("hi pretty " + name + " ur age is " + age)
//         console.log(req.body); 

//     })
// Connect to MongoDB
// mongoose.connect('mongodb://localhost/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });