const express = require('express');
const portRoute = express.Router();
const adminAuthMiddleware = require('../middlewares/admin_auth'); // Import your admin authentication middleware
const portController = require('../controllers/portController'); // Import your port controller functions

// Apply admin authentication middleware to all routes in this router

// Route for creating a port
portRoute.post('/create', portController.createPort);

// Route for getting all ports
portRoute.get('/', portController.getAllPorts);

// Route for getting a specific port by _id
portRoute.get('/:id', portController.getPort);

// Route for updating a specific port by _id
portRoute.put('/:id', portController.updatePort);

// Route for deleting a specific port by _id
portRoute.delete('/:id', portController.deletePort);

module.exports = portRoute;
