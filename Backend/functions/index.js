
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./serviceAccountKey.json");
const dotenv = require("dotenv");
const connection = require("./Config/dbConfig");
 const  userRoutes  = require("./routes/userRoutes.js");
const checkUserAuth = require("./middleware/auth-middleware");
const noteRouter = require("./routes/noteRoutes");

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const app = express();
app.use(cors());
app.use(express.json());

// middleware protected route
app.use("/api/user/changepassword", checkUserAuth);
app.use("/api/user/loggeduserdata", checkUserAuth);
app.use("/api/note", checkUserAuth);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/note", noteRouter);



app.get("/", async (req, res) => {
    try {
        const conn = await connection;
        console.log(conn);
        res.send("firebase working and db");
    } catch (error) {
        console.log(error);
    }
  
});



app.get("/new", (req, res) => {
  res.send("firebase new working ");
});

exports.app = functions.https.onRequest(app);
