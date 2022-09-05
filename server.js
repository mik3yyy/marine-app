
const app = require('./app');
const mongoose =require('mongoose');

mongoose.connect("mongodb+srv://chinedum:CHInedum12@cluster0.unoopz3.mongodb.net/?retryWrites=true&w=majority").then((e)=>console.log('database connected'));

app.listen(process.env.PORT||3000, (req,res)=>console.log('looged in '));


