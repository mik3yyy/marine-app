const mongoose = require('mongoose');

const PortSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure port names are unique
    },
    location:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
    // Other port-related fields
});

const Port = mongoose.model('Port', PortSchema);

module.exports = Port;
