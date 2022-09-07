const mongoose= require('mongoose');

const TranferSchema = mongoose.Schema({
    sendername:{
        type:String,
        required: true,
        trim:true
    },
    senderaccount:{
        type:String,
        required: true,
        trim:true
    },
    receivername:{
        type:String,
        required: true,
        trim:true
    },
    receiveraccount:{
        type:String,
        required: true,
        trim:true
    },
    amount:{
        type:Number,
        required: true,
        trim:true
    },
    beneficiary:{
        type:String,
        required: true,
        trim:true
    }

});

const Transfer = mongoose.model('transfers',TranferSchema);

module.exports=Transfer;