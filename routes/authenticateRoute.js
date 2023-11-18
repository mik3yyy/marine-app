const express= require('express');
const authRoute=express.Router();
const authController= require('../controllers/authController');


authRoute.post('/signup',authController.signUp );
authRoute.post('/login',authController.login );
authRoute.post('/signup/admin',authController.adminSignup);
authRoute.post('/login/admin',authController.adminLogin);
authRoute.get('/login/token',authController.getUserDataByToken);
authRoute.put('/user/edit/:id',authController.editUser);
authRoute.delete('/user/delete/:id',authController.deleteUser);



module.exports=authRoute;