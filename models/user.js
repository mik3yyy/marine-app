const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true

    },
    lastname: {
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true
    },
    phonenumber:{
        type:String,
        required: true,
        trim:true
    },
    dateofbirth:{
        type:String,
        required: true,
        trim:true
    },
    gender:{
        type:String,
        required: true,
        trim:true
    },
    username:{
        type:String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true
    },
    pin:{
        type:String,
        required: true,
        trim:true
    },
    bvn:{
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

const User= mongoose.model('user',userSchema);
module.exports=User;