const app = require('./app');
const mongoose =require('mongoose');

mongoose.connect("mongodb+srv://Chinedum:CHInedum12@cluster0.ldpmg7r.mongodb.net/virtual_classroom").then((e)=>console.log('database connected'));

// mongodb+srv://chinedum:CHInedum12@cluster0.unoopz3.mongodb.net/?retryWrites=true&w=majority
app.listen(process.env.PORT||8000, (req,res)=>console.log('looged in '));


