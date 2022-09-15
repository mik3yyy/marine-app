const mongoose= require('mongoose');

const adminSchema= mongoose.Schema({
   
    username:{
        type:String,
        required: true,
        trim:true
    },
   
    pin:{
        type:String,
        required: true,
        trim:true
    },
    
    accountnumber:{
        type:String,
        required: true,
        trim:true
    },
    balance:{
        type:Number,
        required: true,
        trim:true
    }
   

});

const Admin= mongoose.model('admin',adminSchema);
module.exports=Admin;