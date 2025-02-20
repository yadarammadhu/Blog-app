const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.js');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECREATE);
        console.log("Decoded Token:", decoded); // Debugging log
        console.log("UserId from Token:", decoded.userId); // Debugging log
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not Found" });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: User is not an admin" });
        }

        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const isLogin = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECREATE);
        console.log("Decoded Token:", decoded); // Debugging log
        console.log("UserId from Token:", decoded.userId); // Debugging log
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not Found" });
        }
        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
module.exports = { isAdmin, isLogin};
