const User = require('../models/user');
const md5= require('md5');
const Ehandler =require("../handlers/error");
const jwt = require('jsonwebtoken');
// adminController.js
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const { secretKey } = require('../config'); // Replace with your secret key
exports.signUp=async (req,res)=>{   
    const body = req.body;
    var exist = await User.findOne({username:body.username});
     
    if(exist){
        Ehandler(res,400,"Username already exist");
        // res.status(400).json({
        //     status: false,
        //     error:'Username already exist',
        // });

    }else{

    
        
        // const secretKey = 'your-secret-key'; // Replace with your actual secret key
        
        const token = jwt.sign(body.username, secretKey); // Token expires in 1 hour
        
    

         let user=User({
      
             fullname:body.fullname,
        email:body.email,
        username:body.username,
        password:md5(body.password),
        dateOfBirth:Date.now(),
        gender:body.gender,
        token: token
        
        });
  user = await user.save();
  res.status(200).json({
    status: true,
    user,
    },);
  }
}

exports.login=async(req,res)=>{
     const body=req.body;
    let user;
    
    if(body.hashed==true){
        user= await User.findOne({username:body.username,password:body.password});
    }else{
        user= await User.findOne({username:body.username,password:md5(body.password)});
    }



    if(user==null){
        Ehandler(res,400,"User with this Username or password does not exist!");
        
        // res
        // .status(400)
        // .json({ msg: "User with this Username or password does not exist!" });
    }else{

     res.json({
        status: true,
        user,
        });
    }

}


exports.adminSignup = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const admin = new Admin({
            username,
            password: hashedPassword,
        });

        await admin.save();

        res.status(201).json({ message: 'Admin created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the admin by username
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ adminId: admin._id }, secretKey, { expiresIn: '10h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// module.exports = { signup, login };
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const { secretKey } = require('../config'); // Replace with your actual secret key
// const Ehandler = require("../handlers/error");

exports.getUserDataByToken = async (req, res) => {
    // Assume token is sent in Authorization header as "Bearer token"
    const token = req.headers.authorization.split(" ")[1];

    try {
        // Verify and decode the token
        // const decoded = jwt.verify(token, secretKey);

        // Find the user by username stored in token
        const user = await User.findOne({ token: token });

        if (!user) {
            return Ehandler(res, 404, "User not found");
        }

        // Send back user data
        res.json({
            status: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                token :  token
                // Don't send back the password or token here for security reasons
            }
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return Ehandler(res, 401, "Token expired");
        } else if (error.name === 'JsonWebTokenError') {
            return Ehandler(res, 401, "Invalid token");
        } else {
            console.error(error);
            return Ehandler(res, 500, "Internal server error");
        }
    }
};
exports.editUser = async (req, res) => {
    const { id } = req.params; // Assuming the user ID is passed as a URL parameter
    const { email, fullname, username, dateOfBirth, gender } = req.body; // Destructure the fields you expect to update

    try {
        // Find the user by ID
        // const user = await User.findOne({ username: username });
        let user = await User.findById(id);

        // If user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
            });
        }

        // Update the user's information
        user.email = email;
        user.fullname = fullname;
        user.username = username;
        user.dateOfBirth = new Date(dateOfBirth);
        user.gender = gender;

        // Save the updated user
        await user.save();

        // Return the updated user information, omitting sensitive data like password
        const updatedUser = {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            // Do not send back the password or token
        };

        return res.status(200).json({
            status: true,
            message: 'User profile updated successfully',
            user: updatedUser,
        });

    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};
exports.deleteUser = async (req, res) => {
    const { id } = req.params; // Assuming the user ID is passed as a URL parameter

    try {
        const user = await User.findById(id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
            });
        }

        // Delete the user
        await user.remove();

        // Return a success message
        return res.status(200).json({
            status: true,
            message: 'Account has been deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting user account:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};
