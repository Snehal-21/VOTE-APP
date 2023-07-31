import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import session from "express-session";

const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('src'));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(session({secret: 'jforce-secret', resave: false, saveUninitialized: true ,cookie: { maxAge: 10000 },}));
app.use('/api/jforce',router);

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>console.log("DB connection Established."))
.catch((err)=>console.log("DB error==>",err));

app.listen(process.env.PORT,()=>console.log(`working on PORT ${process.env.PORT}`));