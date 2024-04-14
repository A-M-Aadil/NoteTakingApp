const express = require("express");
const checkUserAuth = require("../middleware/auth-middleware");
const noteModel = require("../models/Note.js")
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");

// noteRouter.use(checkUserAuth);


noteRouter.get("/", async(req, res)=>{
    
    try {
        const data = await noteModel.find({user:req.user._id});
        if (data) {
            res.send({"status":"Sucess", "data":data});
        }else{
            res.send({"status":"failed", "message":"no data available"});
        }
    } catch (error) {
        res.send({"status":"failed", "message":"unable to retrive data"});
    }
    
});

noteRouter.post("/create", async (req, res)=>{
    try {
        const {title, content, user} = req.body;
        const note = new noteModel({title:title, content:content, user:req.user._id});
        await note.save();

        res.send({"status":"Sucess", "message":"Note created"});
    } catch (error) {
        res.send({"status":"failed", "message":"Unable to note create", "err":error.message});
    }
});

noteRouter.patch("/", async (req, res)=>{
    let {id} = req.headers;

    try {
        await noteModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({"status":"Sucess", "message":"Note Updated"});
    } catch (error) {
        res.send({"status":"failed", "message":"Unable to Update", "err":error.message});
    }
});

noteRouter.delete("/", async (req, res)=>{
    let {id} = req.headers;

    try {
        await noteModel.findByIdAndDelete({_id:id});
        res.send({"status":"Sucess", "message":"Note Deleted"});
    } catch (error) {
        res.send({"status":"failed", "message":"Unable to Delete", "err":error.message});
    }
});

module.exports=noteRouter;
