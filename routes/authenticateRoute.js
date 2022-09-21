const express= require('express');
const authRoute=express.Router();
const authController= require('../controllers/authController');


authRoute.post('/signup',authController.signUp );
authRoute.post('/login',authController.login );
authRoute.post('/signup/admin',authController.signUpAdmin);
authRoute.post('/signup/card',authController.createcard);
authRoute.post('/login/card',authController.getCards);



module.exports=authRoute;