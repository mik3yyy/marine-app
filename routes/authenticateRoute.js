const express= require('express');
const authRoute=express.Router();
const authController= require('../controllers/authController');


authRoute.post('/signup',authController.signUp );
authRoute.post('/login',authController.login );


module.exports=authRoute;