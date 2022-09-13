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
    sendernewbalance:{
        type:Number,
        required: true,
        trim:true
    },
    receivernewbalance:{
        type:Number,
        required: true,
        trim:true
    },
    narration:{
        type:String,
        required: true,
        trim:true
    },
    time:{
        type:String,
        required:true,
    },
    day:{
        type:String,
        required:true,
    },
    month:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    }

    


});

const Transfer = mongoose.model('transfers',TranferSchema);

module.exports=Transfer;