import User from "../models/user.js";
import bcrypt from "bcrypt";
import { passwordValidator } from "../src/utils/validator.js";

export const registerChecks=async(req,res,next)=>{
    try {
        const{name,email,password,confirmpassword,number}=req.body;
        if(!name) return res.status(404).json({status:404,"message":"Name is required"});
        if(!email) return res.status(404).json({status:404,"message":"Email is required"});
        if(!password) return res.status(404).json({status:404,"message":"Password is required"});
        if(!confirmpassword) return res.status(404).json({status:404,"message":"Confirm your password"});
        if(!number) return res.status(404).json({status:404,"message":"Number is required"});

        // if(password.length <5 && confirmpassword.length <5) return res.status(400).json({status:400,"message":"Credentials should be more than 5 digits."});

        if(password !== confirmpassword) return res.status(400).json({status:400,"message":"Credentials should be equal"});

        try{
           passwordValidator(password)
        }catch(error){
            return res.send(error.message);
        }
        next();
    } catch (error) {
        return res.send(error);
    }
}



export const loginChecks=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        if(!email) return res.status(404).json({status:404,"message":"Email is required"});
        if(!password) return res.status(404).json({status:404,"message":"Password is required"});

        const checkUser=await User.findOne({email}).exec();
        if(!checkUser) return res.status(404).json({status:404,"message":"You are not registered."});

        const decPassword=await bcrypt.compare(password,checkUser.password);

        if(!decPassword) return res.status(400).json({status:400,"message":"Incorrect Credentials."});

        next();

    } catch (error) {
        return res.status(400).json({status:400,"message":error});
    }
}