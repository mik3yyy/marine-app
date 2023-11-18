const express = require('express');
const scheduleRoute = express.Router();
const scheduleController = require('../controllers/scheduleController'); // Import your schedule controller functions

// Route for creating a schedule
scheduleRoute.post('/create', scheduleController.createSchedule);

// Route for getting all schedules
scheduleRoute.get('/', scheduleController.getAllSchedules);

// Route for getting a specific schedule by _id
scheduleRoute.get('/:id', scheduleController.getSchedule);


scheduleRoute.post('/date', scheduleController.getSchedulesByDate);

scheduleRoute.post('/date-range', scheduleController.getSchedulesByDateRange);

// Route for updating a specific schedule by _id
scheduleRoute.put('/:id', scheduleController.updateSchedule);

// Route for deleting a specific schedule by _id
scheduleRoute.delete('/:id', scheduleController.deleteSchedule);

module.exports = scheduleRoute;
