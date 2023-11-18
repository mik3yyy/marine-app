const mongoose= require('mongoose');



const TicketSchema = new mongoose.Schema({
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    isReschedulable: {
        type: Boolean,
        default: false, // Set a default value if needed
    },
    // Other ticket-related fields (e.g., ticket number, price, seat number, etc.)
});


// Define a pre-save middleware to generate the unique ticket number

TicketSchema.pre('save', function (next) {
    this.populate({
        path: 'user',
        select: 'fullname email username dateOfBirth gender', // Add the specific fields you want to retrieve
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'ship',
            select: 'name type capacity', // Add the specific fields you want to retrieve from the 'ship' field
        }
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'departurePort',
            select: 'name location', // Add the specific fields you want to retrieve from the 'departurePort' field
        }
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'destinationPort',
            select: 'name location', // Add the specific fields you want to retrieve from the 'destinationPort' field
        }
    });

    next();
});
TicketSchema.pre('find', function() {
    this.populate({
        path: 'user',
        select: 'fullname email username dateOfBirth gender', // Add the specific fields you want to retrieve
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'ship',
            select: 'name type capacity', // Add the specific fields you want to retrieve from the 'ship' field
        }
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'departurePort',
            select: 'name location', // Add the specific fields you want to retrieve from the 'departurePort' field
        }
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'destinationPort',
            select: 'name location', // Add the specific fields you want to retrieve from the 'destinationPort' field
        }
    });
});
TicketSchema.pre('findOne', function(next) {
    this.populate({
        path: 'user',
        select: 'fullname email username dateOfBirth gender', // Add the specific fields you want to retrieve
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'ship',
            select: 'name type capacity', // Add the specific fields you want to retrieve from the 'ship' field
        }
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'departurePort',
            select: 'name location', // Add the specific fields you want to retrieve from the 'departurePort' field
        }
    });

    this.populate({
        path: 'schedule',
        populate: {
            path: 'destinationPort',
            select: 'name location', // Add the specific fields you want to retrieve from the 'destinationPort' field
        }
    });
    next();
});


const Ticket = mongoose.model('tickets',TicketSchema);

module.exports=Ticket;

// user: {
//     // Include the user data directly
//     fullname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     dateOfBirth: {
//         type: Date, // Assuming you want to store the date as a Date object
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true,
//         enum: ['male', 'female'] // Only 'male' or 'female' values are allowed
//     },

//     // Add other user properties as needed
// },