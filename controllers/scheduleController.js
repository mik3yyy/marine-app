const Schedule = require('../models/schedule');

exports.createSchedule = async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body);
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getSchedulesByDate = async (req, res) => {
    try {
        
        // Get the date from the request (you can pass the date as a query parameter or in the request body)
        const date = new Date(req.body.date); // Assuming the date is passed as a query parameter

        // Find schedules that match the given date (using date range within the same day)
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const schedules = await Schedule.find({
            departureTime: {
                $gte: startOfDay,
                $lt: endOfDay,
            }
        });

        res.status(200).json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getSchedulesByDateRange = async (req, res) => {
    try {
        // Get the start date and end date from the request (you can pass them as query parameters or in the request body)
        const startDate = new Date(req.body.startDate); // Assuming start date is passed as a query parameter
        const endDate = new Date(req.body.endDate);     // Assuming end date is passed as a query parameter

        // Find schedules that fall within the specified date range (inclusive)
        const schedules = await Schedule.find({
            departureTime: {
                $gte: startDate,
                $lte: endDate,
            }
        });

        res.status(200).json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateSchedule = async (req, res) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteSchedule = async (req, res) => {
    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(204).end(); // Successful deletion with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};