
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
const notesRouter = require("./routes/notesRoutes");

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const app = express();
app.use(cors({origin:true}));
app.use(express.json());

// middleware protected route
app.use("/api/user/changepassword", checkUserAuth);
app.use("/api/user/loggeduserdata", checkUserAuth);
app.use("/api/notes", checkUserAuth);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/notes", notesRouter);
app.use("/api/note", noteRouter);

connection;


exports.app = functions.https.onRequest(app);
