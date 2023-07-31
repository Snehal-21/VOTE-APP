import User from "../models/user.js"
import path from "path";
import bcrypt from "bcrypt";

const __dirname=path.resolve();

export const renderRegister=async(req,res)=>{
    try {
        res.sendFile(__dirname+"/src/HTML/register.html");
    } catch (error) {
        return res.status(400).json({status:400,"message":error});
    }
}

export const register=async(req,res)=>{
    try {
        const{name,email,password,number}=req.body;

        const checkUser=await User.findOne({email}).exec();
        if(checkUser) res.status(400).json({status:400,"message":"You are already registered."});

        const encPassword=await bcrypt.hash(password,10);
        // console.log(encPassword);

        const newUser=new User({
            name,
            email,
            password:encPassword,
            number
        });
        await newUser.save();
        res.redirect('/api/jforce/login');





    } catch (error) {
        return res.status(400).json({status:400,"message":error});
    }
}


export const renderLogin=async(req,res)=>{
    try {
        res.sendFile(__dirname+"/src/HTML/login.html");
    } catch (error) {
        return res.status(400).json({status:400,"message":error});
    }
}

export const login=async(req,res)=>{
    try {
        const {email} = req.body;
        req.session.email = email;
        // window.location.href="/src/HTML/voting.html";
        res.redirect('/api/jforce/rendervote');
    } catch (error) {
        return res.status(400).json({status:400,"message":error});
    }
}