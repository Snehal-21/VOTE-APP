import mongoose,{Schema} from "mongoose";

const user=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
});

export default mongoose.model("User",user);