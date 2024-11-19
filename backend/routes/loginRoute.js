const express = require("express");
const router = express.Router();
const{
    registerPerson,loginPerson
}=require("../controllers/loginController");
const {validateJwtToken} = require("../middlewares/jwtmiddleware");
router.post("/register", registerPerson);
router.post("/login",loginPerson);
module.exports=router;