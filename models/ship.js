const mongoose= require('mongoose');

const ShipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Make the name field unique
        trim: true,
    },
    type: String, // e.g., "Ferry," "Cargo Ship," "Speed Boat"
    capacity: Number, // Maximum passenger capacity
    description : {
        type: String,
        required: true,
        unique: true, // Make the name field unique
        trim: true,
    },
    image: {
        type: String,
        required: true,
        unique: true, // Make the name field unique
        trim: true,
    }
    
    // Other ship-related fields (e.g., operator, description)
});

const Ship = mongoose.model('Ship', ShipSchema);

module.exports=Ship;