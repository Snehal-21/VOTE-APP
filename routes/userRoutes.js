import express from "express";
import { login, register, renderLogin, renderRegister } from "../Controllers/userControllers.js";
import { loginChecks, registerChecks } from "../middlewares/auth.js";
import Admin from "../models/admin.js";
import {CronJob} from "cron";
import { admin, redenerAdmin } from "../Controllers/adminController.js";
import { checkCount, redendervoting, voting } from "../Controllers/voteCotroller.js";


const generateAdmin = async(admin) =>{
    try {
        for(const adminData of admin){
            const adminExist = await Admin.exists({email: adminData.email}).exec();

            if(!adminExist){
                const adminUser = new Admin({
                    email: adminData.email,
                    password: adminData.password
                });
                await adminUser.save();
                console.log("Admin user generated successfully.");
            }
        }
    } catch (error) {
        console.log("Admin generation error", error);
        return;
    }
}

const adminsToAdd = [
    {
        email: 'admin1',
        password: 'admin1'
    },
    {
        email: 'admin2',
        password: 'admin2'
    },
    {
        email: 'admin3',
        password: 'admin3'
    }
];

let job = new CronJob("* * * * * *", async() =>{
    await generateAdmin(adminsToAdd);

    job.stop();
});

job.start();


const router=express.Router();

router.get('/register',renderRegister);
router.post('/register',registerChecks,register);

router.get('/login',renderLogin);
router.post('/login',loginChecks,login);

router.get('/admin',redenerAdmin);
router.post('/admin',admin);
router.get('/adminCount',checkCount);


router.get('/rendervote',redendervoting);
router.post('/vote',voting);

// router.get('/count',checkCount);


export default router;