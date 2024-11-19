// const express = require('express');
// const connectDb = require("./config/dbConnection");
// const cors = require("cors");
// const mongoose = require('mongoose');
// const dotenv = require("dotenv");
// const multer = require('multer');
// const path = require("path");
// const errorHandler = require("./middlewares/errorHandler");


// dotenv.config();
// connectDb();

// const app= express();
// const port = process.env.PORT || 3000;

// const conn = mongoose.connection;

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("working");
// });

// app.use(errorHandler)
// app.use("/api/person", require("./routes/loginRoute"));


// app.listen(port,()=>{
//     console.log(`server running on port http://localhost:${port}`);
// })

const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();
connectDb(); // Connect to MongoDB

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// app.use(cors()); // Enable CORS for cross-origin requests
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
  }));

// Routes
app.use("/api/person", require("./routes/loginRoute"));

// Error Handling Middleware
app.use(errorHandler);

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
