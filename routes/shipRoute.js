const express= require('express');
const shipRoute=express.Router();
const adminAuthMiddleware = require('../middlewares/admin_auth');
const shipController = require('../controllers/shipController')
// shipRoute.use(adminAuthMiddleware);
shipRoute.post('/create', shipController.createShip);
// Route for getting all ships
shipRoute.get('/', shipController.getAllShips);

// Route for getting a specific ship by _id
shipRoute.get('/:id', shipController.getShip);

// Route for updating a specific ship by _id
shipRoute.put('/:id', shipController.updateShip);

// Route for deleting a specific ship by _id
shipRoute.delete('/:id', shipController.deleteShip);


module.exports=shipRoute;
