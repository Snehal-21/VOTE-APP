import mongoose,{Schema} from "mongoose";

const vote=new Schema({
    email:{
        type:String,
        required:true
    },
    candidate1:String,
    candidate2:String,
    candidate3:String,
    candidate4:String
    
});

export default mongoose.model("Vote",vote);