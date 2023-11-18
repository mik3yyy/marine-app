const express = require('express');

const  authRoute= require('./routes/authenticateRoute');
const ticketRoute =require('./routes/ticketRoute');
const shipRoute =require('./routes/shipRoute');
const portRoute =require('./routes/portRoute');
const scheduleRoute =require('./routes/scheduleRoute');
const paymentRoute =require('./routes/payment');
const app = express();
var cors = require('cors')
const path = require("path")

app.use(cors()) // Use this after the variable declaration
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")))

app.use('/api/auth',authRoute);
app.use('/api/ticket',ticketRoute);
app.use('/api/port',portRoute);
app.use('/api/ship',shipRoute);
app.use('/api/schedule',scheduleRoute);
app.use('/api/payment',paymentRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})

module.exports=app;