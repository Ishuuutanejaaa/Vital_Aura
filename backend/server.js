const express = require('express');
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const multer = require('multer');
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");


dotenv.config();
connectDb();

const app= express();
const port = process.env.PORT || 3000;

const conn = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/",(req,res)=>{
    res.send("working");
});

app.use(errorHandler)
app.use("/api/person", require("./routes/loginRoute"));


app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
})