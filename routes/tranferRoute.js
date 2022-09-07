const express= require('express');
const transferRoute=express.Router();
const transferController= require('../controllers/transferController')
transferRoute.post('/transfer', transferController.Transefer);

module.exports=transferRoute;
