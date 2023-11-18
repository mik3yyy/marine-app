const Port = require('../models/port');

exports.createPort = async (req, res) => {
    try {
        // Extract the fields you want from req.body
        const { name, location , image, description/* other relevant fields */ } = req.body;
// console.log(name);
        // Create a new port document
        const newPort = new Port({
            name,
            location,
            description,
            image
            // Add other relevant fields here
        });

        const savedPort = await newPort.save();
        res.status(201).json(savedPort);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePort = async (req, res) => {
    try {
        const updatedPort = await Port.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPort) {
            return res.status(404).json({ message: 'Port not found' });
        }
        res.status(200).json(updatedPort);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deletePort = async (req, res) => {
    try {
        const deletedPort = await Port.findByIdAndDelete(req.params.id);
        if (!deletedPort) {
            return res.status(404).json({ message: 'Port not found' });
        }
        res.status(204).end(); // Successful deletion with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllPorts = async (req, res) => {
    try {
        const ports = await Port.find();
        res.status(200).json(ports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPort = async (req, res) => {
    try {
        const port = await Port.findById(req.params.id);
        if (!port) {
            return res.status(404).json({ message: 'Port not found' });
        }
        res.status(200).json(port);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
