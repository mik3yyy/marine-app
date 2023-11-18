const mongoose= require('mongoose');

const PaymentSchema = new mongoose.Schema({
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    },
    amount: Number,
    paymentMethod: String, // e.g., "Credit Card," "PayPal"
    // Other payment-related fields (e.g., transaction ID, payment status)
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports=Payment;