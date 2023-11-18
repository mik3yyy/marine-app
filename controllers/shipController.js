// const express = require('express');
// const router = express.Router();
const Admin = require('../models/admin'); // Import the Admin model
const Ship = require('../models/ship'); // Import the Ship model

// Define a route for creating a ship
exports.createShip= async (req, res) => {
    try {
        // Check if the user is an admin
       

        // Create a new ship
        const newShip = new Ship({
            name: req.body.name,
            type: req.body.type,
            capacity: req.body.capacity,
            description: req.body.description,
            image: req.body.image,

            // Other ship-related properties
        });

        // Save the ship to the database
        await newShip.save();

        res.status(200).json(newShip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getAllShips = async (req, res) => {
    try {
        const ships = await Ship.find();
        res.status(200).json(ships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// module.exports = router;

exports.getShip = async (req, res) => {
    try {
        const ship = await Ship.findById(req.params.id);
        if (!ship) {
            return res.status(404).json({ message: 'Ship not found' });
        }
        res.status(200).json(ship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateShip = async (req, res) => {
    try {
        const updatedShip = await Ship.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShip) {
            return res.status(404).json({ message: 'Ship not found' });
        }
        res.status(200).json(updatedShip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteShip = async (req, res) => {
    try {
        const deletedShip = await Ship.findByIdAndDelete(req.params.id);
        if (!deletedShip) {
            return res.status(404).json({ message: 'Ship not found' });
        }
        res.status(204).end(); // Successful deletion with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


