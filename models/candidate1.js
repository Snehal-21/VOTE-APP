import mongoose,{Schema} from "mongoose";

const candidate1=new Schema({
    votes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vote"
    }
});

export default mongoose.model("Candidate1",candidate1);