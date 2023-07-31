import Admin from "../models/admin.js";
import path from "path";

const __dirname=path.resolve();

export const redenerAdmin=async(req,res)=>{
    try {
        res.sendFile(__dirname+"/src/HTML/adminLogin.html");
    } catch (error) {
        return res.send(error);
    }
}

export const admin=async(req,res)=>{
    try {
        const {email,password}=req.body;
       const checkAdmin=await Admin.find({email}).exec();
       console.log(checkAdmin);
        // if(!checkAdmin) return res.send("Log in as a Admin")
        if(checkAdmin[0].email==email && checkAdmin[0].password==password){
            // return res.sendFile(__dirname+"/")
            res.redirect('/api/jforce/adminCount');
            // return res.status(200).json({status:200,"message":"Admin Login successfully"});
        }else{
            return res.status(400).json({status:400,"message":"Incorrect credentials."});
        }
        
    } catch (error) {
        return res.send(error);
    }
}