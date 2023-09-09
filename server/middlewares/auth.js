const jwt = require('jsonwebtoken');
require('dotenv').config();
// const User = require('../models/User');
//auth
exports.auth = (req,res, next) => {
    try{
        //extract JWT token
        //PENDING : other ways to fetch token
        // console.log("cookie" , req.cookies.token);
        // console.log("body" , req.body.token);
        // console.log("header", req.header("Authorization"));
       console.log("BEFORE TOKEN")
        const token = req.cookies.token
                      || req.body.token 
                      || req.header("Authorization").replace("Bearer ", "");
        console.log("BEFORE TOKEN") 
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            //why this ?
            req.user = decode;
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }  
}
//isstudent
exports.isStudent = (req,res,next) => {
    try{
            if(req.user.accountType !== "Student") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for students',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        });
    }
}
//isInstructor
exports.isInstructor = (req,res,next) => {
    try{
            if(req.user.accountType !== "Instructor") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for students',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        });
    }
}
//isAdmin
exports.isAdmin = (req,res,next) => {
    try{
            if(req.user.accountType !== "Admin") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for students',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        });
    }
}
