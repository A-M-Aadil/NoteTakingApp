const express = require("express");
const noteModel = require("../models/Note.js")
const noteRouter = express.Router();

// note create route
noteRouter.post("/create", async (req, res)=>{
    try {
        const {title, content, user, date} = req.body;
        const note = new noteModel({title:title, content:content, user:user, date:date});
        await note.save();

        res.send({"status":"success", "message":"Note created"});
    } catch (error) {
        res.send({"status":"failed", "message":"Unable to note create", "err":error.message});
    }
});

// note update route
noteRouter.patch("/update", async (req, res)=>{
    let {id, title, content, date} = req.body
    try {
        await noteModel.findByIdAndUpdate({_id:id}, {$set:{title:title, content:content, date:date}})
        res.send({"status":"success", "message":"Note Updated"});
    } catch (error) {
        res.send({"status":"failed", "message":"Unable to Update"});
    }
});

// note delete route
noteRouter.post("/delete", async (req, res)=>{
    let {id} = req.body;

    try {
        await noteModel.findByIdAndDelete({_id:id});
        console.log(id)
        res.send({"status":"success", "message":"Note Deleted"});
    } catch (error) {
        res.send({"status":"failed", "message":"Unable to Delete", "err":error.message});
    }
});

module.exports=noteRouter;
