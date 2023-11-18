const Ticket = require('../models/ticket');
const User = require('../models/user');
const Ehandler =require("../handlers/error");

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        var body = req.body;
    var user = await User.findOne({username:body.username});
if(user){
    // schedule: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Schedule',
    //     required: true,
    // },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true,
    // },
    // isReschedulable: {
    //     type: Boolean,
    //     default: false, // Set a default value if needed
    // },
    const newTicket = new Ticket({
        schedule: body.schedule,
        user: user._id,
        isReschedulable: body.isReschedulable
    });
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
}else{
    Ehandler(res,400,"User with this Username does not exist!");

}
     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a ticket by ID
exports.getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.id});
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllUserTickets = async (req, res) => {
    try {
      
        const userId = req.params.userId; // You can pass the user's ID as a parameter or from the authenticated user's session
        
        // Find all tickets for the specified user
        const userTickets = await Ticket.find({ user: userId });
        
        res.status(200).json(userTickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserTicketsByDate = async (req, res) => {
    try {
        const userId = req.params.userId; // You can pass the user's ID as a parameter or from the authenticated user's session
        const startDate = new Date(req.query.startDate); // Assuming start date is passed as a query parameter
        const endDate = new Date(req.query.endDate);     // Assuming end date is passed as a query parameter

        // Find user tickets within the specified date range
        const userTickets = await Ticket.find({
            user: userId,
            departureTime: {
                $gte: startDate,
                $lte: endDate,
            }
        });

        res.status(200).json(userTickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Update a ticket by ID
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Check if isReschedulable is false
        if (!ticket.isReschedulable) {
            return res.status(403).json({ message: 'You cannot update the schedule for this ticket.' });
        }

        // Update the ticket
        ticket.set(req.body);
        const updatedTicket = await ticket.save();

        res.status(200).json(updatedTicket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        await ticket.remove();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
