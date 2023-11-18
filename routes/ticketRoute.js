const express= require('express');
const ticketRoute=express.Router();
const ticketController= require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authorization');

ticketRoute.use(authMiddleware);

// Define routes for CRUD operations on tickets
ticketRoute.post('/create', ticketController.createTicket);
ticketRoute.get('/:id', ticketController.getTicket);
ticketRoute.post('/:userId/all', ticketController.getAllUserTickets);
ticketRoute.post('/:userId/by-date', ticketController.getUserTicketsByDate);
ticketRoute.put('/:id', ticketController.updateTicket);
ticketRoute.delete('/:id', ticketController.deleteTicket);

module.exports = ticketRoute;
