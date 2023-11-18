const mongoose = require('mongoose');
// const Port = require('./port'); // Import the Port model

const ScheduleSchema = new mongoose.Schema({
    ship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ship',
    },
    departurePort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Port',
    },
    destinationPort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Port',
    },
    departureTime: Date,
    // Other schedule-related fields (e.g., price, available seats)
});
ScheduleSchema.pre('save', async function (next) {
    try {
        // // Get the count of existing tickets
        // const ticketCount = await this.constructor.countDocuments();
        
        // // Set the ticket number to count + 1
        // this.ticketNumber = ticketCount + 1;
        this.populate({
            path: 'ship',
            select: 'name type capacity image description', // Add the specific fields you want to retrieve
        });
        this.populate('departurePort', 'name location image description'); // Replace with the specific fields you want to retrieve
        this.populate('destinationPort', 'name location image description'); 
        
        next();
    } catch (error) {
        next(error);
    }
});
ScheduleSchema.pre('find', function() {
   
        // // Get the count of existing tickets
        // const ticketCount = await this.constructor.countDocuments();
        
        // // Set the ticket number to count + 1
        // this.ticketNumber = ticketCount + 1;
        this.populate({
            path: 'ship',
            select: 'name type capacity image description', // Add the specific fields you want to retrieve
        });
        this.populate('departurePort', 'name location image description'); // Replace with the specific fields you want to retrieve
        this.populate('destinationPort', 'name location image description'); 
        
  
});
// TicketSchema.pre('find', function() {
//     this.populate({
//         path: 'user',
//         select: 'fullname email username dateOfBirth gender', // Add the specific fields you want to retrieve
//     });
    
// });
const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
