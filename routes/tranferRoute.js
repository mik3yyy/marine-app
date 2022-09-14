const express= require('express');
const transferRoute=express.Router();
const transferController= require('../controllers/transferController')
transferRoute.post('/transfer', transferController.Transfer);
transferRoute.post('/transfer/findaccount',transferController.findAccount);
transferRoute.post('/transfer/history',transferController.TransferHistory);
transferRoute.post('/transfer/beneficiary',transferController.getBeneficary);


module.exports=transferRoute;
