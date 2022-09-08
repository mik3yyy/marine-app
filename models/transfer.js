const mongoose= require('mongoose');

const TranferSchema = mongoose.Schema({
    senderusername:{
        type:String,
        required: true,
        trim:true
    },
    senderaccount:{
        type:String,
        required: true,
        trim:true
    },
    receiverusername:{
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
    narration:{
        type:String,
        required: true,
        trim:true
    }

});

const Transfer = mongoose.model('transfers',TranferSchema);

module.exports=Transfer;