const  userModel  = require("../models/User.js");
const jwt = require("jsonwebtoken");

const checkUserAuth = async(req, res, next)=>{
    let token ;
    const { authorization } = req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1];

            // verify token
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // get user from token
            req.user = await userModel.findById(userID).select("-password");
            next();
            
        } catch (error) {
            res.send({"status":"failed", "message":"Unauthorized User"});
        }
    }
    if (!token) {
        res.send({"status":"failed", "message":"Unauthorized User, No Token"})
    }
}

module.exports = checkUserAuth;