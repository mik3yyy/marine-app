const app = require('./app');
const mongoose =require('mongoose');

const mongo_uri = "mongodb+srv://Michael:CHInedum12@cluster0.rl2r1sh.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(mongo_uri).then((e)=>console.log('database connected'));
//mongodb+srv://Chinedum:CHInedum12@cluster0.ldpmg7r.mongodb.net/virtual_classroom
// mongodb+srv://chinedum:CHInedum12@cluster0.unoopz3.mongodb.net/?retryWrites=true&w=majority
app.listen(process.env.PORT||8000, (req,res)=>console.log('looged in '));


