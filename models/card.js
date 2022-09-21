const moongoose = require('mongoose');

const CardSchema= moongoose.Schema({
    accountnumber:{
        required:true,
        type:String,
        trim:true
    },

    cardnumber:{
        required:true,
        type:String,
        trim:true,
    },
    cardname:{
        required: true,
        type:String,
        trim:true
    },
    validMonth:{
        required: true,
        type:String,
    },
    validYear:{
        required: true,
        type:String
    },
    cvv:{
        required:true,
        type:String,

    },
    color:{
        type:String,
        
    },
    blocked:{
        type:Boolean
    }


});



const Card = moongoose.model('card',CardSchema);

module.exports=Card;
