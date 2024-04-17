const express = require("express");
const checkUserAuth = require("../middleware/auth-middleware");
const noteModel = require("../models/Note.js")
const notesRouter = express.Router();

// get all notes route
notesRouter.get("/", async(req, res)=>{
    
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


module.exports=notesRouter;
