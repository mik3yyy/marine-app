const mongoose= require('mongoose');


const userSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date, // Assuming you want to store the date as a Date object
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'] // Only 'male' or 'female' values are allowed
    },
    token:{
        type: String,
        required: true,
        trim: true
    }
});



const User= mongoose.model('user',userSchema);
module.exports=User;
