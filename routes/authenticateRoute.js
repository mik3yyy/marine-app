const express= require('express');
const authRoute=express.Router();
const authController= require('../controllers/authController');


authRoute.post('/signup',authController.signUp );
authRoute.post('/login',authController.login );
authRoute.post('/signup/admin',authController.signUpAdmin);


module.exports=authRoute;