
// authMiddleware.js

module.exports =async function(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        // console.log(authHeader);
        const token = authHeader.split(' ')[1];
        req.token = token;
    }
   

    next();
};
