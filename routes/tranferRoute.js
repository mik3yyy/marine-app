const express= require('express');
const transferRoute=express.Router();
const transferController= require('../controllers/transferController')
transferRoute.post('/transfer', transferController.Transefer);
transferRoute.post('/transfer/findaccount',transferController.findAccount);

module.exports=transferRoute;
