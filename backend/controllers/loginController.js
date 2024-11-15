const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Person = require("../model/loginModel");
require("dotenv").config();

const registerPerson = asyncHandler(async(req,res)=>{
    const{email , name , gender , address ,phoneNumber,  password} = req.body;
    if(!email || !name || !gender || !address || !phoneNumber || !password){
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const personExists = await Person.findOne({email});
    if (personExists){
        return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const person = await Person.create({
        email,
        name,
        gender,
        address,
        phoneNumber,
        password : hashedPassword,
    });

    const token = jwt.sign({id: person._id}, process.env.JWT_SECRET , {expiresIn :"1d"});
    res.status(201).json({message:"User registered successfully.",person,token});
});

const loginPerson = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please provide all the fields.");
    }
    const person = await Person.findOne({email});
    if(!person){
        return res.status(400).json({message:"User not found Please register first"});
    }
    const isMatch = await bcrypt.compare(password, person.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Password"});
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({message:"Login succesful and you are being directed to home page" ,token ,  person: {email: person.email , name: person.name}});
});

module.exports = {registerPerson , loginPerson};