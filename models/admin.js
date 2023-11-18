const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    // You can include other admin-related properties as needed
});

const Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin;
