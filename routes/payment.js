// bookingRoutes.js

const express = require('express');
const paymentRouter = express.Router();
const bookingController = require('../controllers/paymentController');

paymentRouter.post('/verify-payment', bookingController.verifyPayment);

module.exports = paymentRouter;
