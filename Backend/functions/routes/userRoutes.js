const express = require("express");
const bycrypt = require("bcrypt");
const  userModel  = require("../models/User.js");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

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

userRouter.get("/loggeduserdata", (req, res)=>{
    res.send({"user":req.user});

});

module.exports = userRouter;
