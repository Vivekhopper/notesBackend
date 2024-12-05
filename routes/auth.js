import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
const router=express.Router()
import bcrypt from "bcrypt"
import middleware from "../middleware/middleware.js"
router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=await req.body
        const user=await User.findOne({email});
        if(user){
            return res.status(401).json({message:"User already Exists",success:"false"})
        }
        const hashpassword=await bcrypt.hash(password,10);
        const newUser=new User({
            username,
            email,
            password:hashpassword
        })
        await newUser.save()
        return res.status(200).json({success:true,message:"Account Created successfully"})
    }
    catch(err){
        return res.status(500).json({success:false,message:"Error in adding user"});
    }
})
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not registered", success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is incorrect", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.Secret_key, { expiresIn: "3d" });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: { username: user.username } 
        });
    } catch (err) {
        console.error("Error in Login server:", err.message);
        return res.status(500).json({ success: false, message: "Error in Login server" });
    }
});


router.get("/verify", middleware, async (req, res) => {
    // Assuming `req.user` is populated by the middleware
    return res.status(200).json({ success: true, user: req.user });
  });
  
export default router;