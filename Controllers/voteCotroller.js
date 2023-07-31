import Vote from "../models/vote.js";
import User from "../models/user.js";
import path from "path";

const __dirname = path.resolve();

export const redendervoting = async (req, res) => {
    try {
        const email = req.session.email;
        if(!email){
            return res.send("Please login first.");
        }
        res.sendFile(__dirname + "/src/HTML/voting.html", {email});
    } catch (error) {
        return res.send(error);
    }
}


export const voting = async (req, res) => {
    try {
        const { candidate1, candidate2, candidate3, candidate4 } = req.body;
        const email = req.session.email;
        const checkUser = await User.find({ email }).exec();

        const checkVote = await Vote.find({ email }).exec();

        if (!checkUser.length) return res.send("You are not registered user to vote");

        if (!checkVote.length) {
            const newVote = new Vote({
                email,
                candidate1,
                candidate2,
                candidate3,
                candidate4
            });
            await newVote.save();
            return res.send("Vote added Successfully");
        } else {
            if(candidate1){
                return res.send(`You cannot vote again. You have already voted for ${candidate1}`);
            }else if(candidate2){
                return res.send(`You cannot vote again. You have already voted for ${candidate2}`);
            }else if(candidate3){
                return res.send(`You cannot vote again. You have already voted for ${candidate3}`);
            }else if(candidate4){
                return res.send(`You cannot vote again. You have already voted for ${candidate4}`);
            }

        }

    } catch (error) {
        return res.send(error);
    }
}


// export const checkCount=async(req,res)=>{
//     const checkVote=await Vote.find({}).exec();
//     // console.log(checkVote);

//    let can1=0;
//    let can2=0;
//    let can3=0;
//    let can4=0;

//    for(let i=0;i<checkVote.length;i++){
//     if(checkVote[i].candidate1){
//         can1++;
//     }else if(checkVote[i].candidate2){
//         can2++;
//     }else if(checkVote[i].candidate3){
//         can3++;
//     }else if(checkVote[i].candidate4){
//         can4++;
//     }
//    }



//    return res.json({"can1":can1,"can2":can2,"can3":can3,"can4":can4});
// }


export const checkCount = async (req, res) => {
    try {
        const checkVote = await Vote.find({}).exec();

        const candidateCounts = checkVote.reduce(
            (counts, vote) => {
                if (vote.candidate1) {
                    counts.can1++;
                } else if (vote.candidate2) {
                    counts.can2++;
                } else if (vote.candidate3) {
                    counts.can3++;
                } else if (vote.candidate4) {
                    counts.can4++;
                }
                return counts;
            },
            { can1: 0, can2: 0, can3: 0, can4: 0 }
        );

        return res.json(candidateCounts);
    } catch (error) {
        return res.status(500).json({ error: 'Error while counting votes.' });
    }
};

