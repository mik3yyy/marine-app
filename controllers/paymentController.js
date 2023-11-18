// bookingController.js

const axios = require('axios');
const paystackSecretKey = 'sk_test_a090fe08e53227556fca644f23e3f7768b691cab'; // Replace with your Paystack secret key

exports.verifyPayment = async (req, res) => {
  const { reference } = req.body;
  
  try {
    // Verify the payment
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`
      }
    });

    if (response.data.status && response.data.data.status === 'success') {
      // Payment was successful
      // Proceed with booking the ticket
    //   const booking = await createBooking(req.body); // Implement createBooking to create the booking in your database
      
      res.json({
        success: true,
        message: 'Payment verified and booking successful',
        
      });
    } else {
      // Payment failed
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during payment verification'
    });
  }
};

