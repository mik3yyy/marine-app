const Admin = require('../models/admin'); // Import the Admin model

// Define the admin authentication middleware
const adminAuthMiddleware = async (req, res, next) => {
    try {
        // Check if the user is authenticated (you need to set up authentication, e.g., using passport.js)
        // if (!req.user) {
        //     return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        // }

        // Check if the authenticated user is an admin
        const isAdmin = await Admin.findOne({ username: req.body.username });
        if (!isAdmin) {
            return res.status(403).json({ message: 'Unauthorized: Admin access required' });
        }

        // If the user is authenticated and is an admin, proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = adminAuthMiddleware;
