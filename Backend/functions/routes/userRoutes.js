const express = require("express");
const bycrypt = require("bcrypt");
const  userModel  = require("../models/User.js");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const transporter = require("../Config/emailConfig.js");

userRouter.post("/register", async (req, res)=>{
    const {name, email, password, confirm_password} = req.body;
    const user = await userModel.findOne({email:email})
    if (user) {
        res.send({"status":"failed", "message":"Email alredy exists"})
    }else{
        if (name && email && password && confirm_password) {
            if (password === confirm_password) {
                try {
                    const salt = await bycrypt.genSalt(10);
                    const hashedPassword =  await bycrypt.hash(password, salt);
                    const newUser = new userModel({
                    name:name,
                    email:email,
                    password:hashedPassword
                });
                await newUser.save();

                // Jwt Generate
                const saved_user = await userModel.findOne({email:email});
                const token = jwt.sign({userID:saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "3d"});

                res.send({"status":"success", "message":"User Registration Success", "token":token});
                } catch (error) {
                    res.send({"status":"failed", "message":"User Registration failed"});
                }
            }else{
                res.send({"status":"failed", "message":"Confirm password does not matched"});
            }
        }else{
            res.send({"status":"failed", "message":"All fields are required"});
        }
    }
});

userRouter.post("/login", async (req, res)=>{
    try {
        const {email, password} = req.body;
        if (email && password) {
            const user = await userModel.findOne({email:email});
            if (user != null) {
                const isMatch = await bycrypt.compare(password, user.password);
                if ((user.email === email) && isMatch) {
                    // Jwt Generate
                    const token = jwt.sign({userID:user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "3d"});

                    res.send({"status":"success", "message":"Login sucess", "token":token});
                }else{
                    res.send({"status":"failed", "message":"Email or Password is incorrect"});
                }
            }else{
                res.send({"status":"failed", "message":"You are not a registered user"});
            }
        } else {
            res.send({"status":"failed", "message":"All fields are required"});
        }
    } catch (error) {
        res.send({"status":"failed", "message":"Sorry!! Unablee to Login"});
        console.log(error.message)
    }

});


userRouter.post("/changepassword", async (req, res)=>{
    const {password, confirm_password} = req.body;
    if (password && confirm_password) {
        if (password !== confirm_password) {
            res.send({"status":"failed", "message":"Confirm password does not matched"});
        } else {
            const salt = await bycrypt.genSalt(10);
            const newhashedPassword =  await bycrypt.hash(password, salt);
            await userModel.findByIdAndUpdate(req.user._id, {$set:{password:newhashedPassword}});

            res.send({"status":"success", "message":"Password change successfully"});
        }
    } else {
        res.send({"status":"failed", "message":"All fields are required"});
    }
});

userRouter.get("/loggeduserdata", async (req, res)=>{
    res.send({"user":req.user});
});

userRouter.post("/send-password-reset-email", async (req, res)=>{
    const {email, page} = req.body;
    if (email) {
        const user =  await userModel.findOne({ email:email });
        
        if (user) {
            const secret = user._id + process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userID: user._id }, secret, {expiresIn: "10m"});
            const link = `${page}/${user._id}/${token}`;

            // send email
            try {
                let info = await transporter.sendMail({
                from:process.env.EMAIL_FROM,
                to:user.email,
                subject:"Password Reset Link - Note Takking",
                html:`Click <a href=${link}>HERE </a> to Reset Your Password. Link valid only 10 minutes`
            });
            res.send({"status":"success", "message":"Password Reset Email Sent.. Please Check Your Email", "info":info});
            } catch (error) {
                res.send({"status":"failed", "message":"Sorry.. we are unable to send email"});
            }
        } else {
            res.send({"status":"failed", "message":"Email does not exists"});
        }
    } else {
        res.send({"status":"failed", "message":"Email field is required"});
    }
});

userRouter.post("/resetpassword/:id/:token", async (req, res)=>{
    const {password, confirm_password} = req.body;
    const {id, token} = req.params;

    const user =  await userModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;

    if (password && confirm_password) {
        if (password !== confirm_password) {
            res.send({"status":"failed", "message":"Confirm password does not matched"});
        }else{
            const salt = await bycrypt.genSalt(10);
            const newhashedPassword =  await bycrypt.hash(password, salt);
            await userModel.findByIdAndUpdate(user._id, {$set:{password:newhashedPassword}});

            res.send({"status":"success", "message":"Password reset successfully"});
        }
    } else {
        res.send({"status":"failed", "message":"All fields are required"});
    }
    try {
        jwt.verify(token, new_secret);
    } catch (error) {
        res.send({"status":"failed", "message":"Invalid token"});
    }
});

module.exports = userRouter;
