import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (userId,role) => {
    const token = jwt.sign(
        { id: userId,
            role:role
         },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "10d" }
    )

    return token;
}

export const signup = async (req, res) => {
    try {
        
        const { fullname, email, password,role } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields required",
                success: false,
            })
        }

        if (fullname.length < 3) {
            return res.status(400).json({
                message: "Full name is must have more than 3 characters",
                success: false
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must have more than 6 characters",
                success: false
            })
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({
                message: "Enter valid email",
                success: false
            })
        }
        const existingUser = await User.findOne({ email });
        
        
        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
                success: false
            })
        }

        const newUser = await User.create({
            fullname,
            email,
            password,
            role
        })

        const token = generateToken(newUser._id,newUser.role);

        return res.status(200).json({
            message: "User successfull registered",
            success: true,
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role,
                token
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password,role } = req.body;
        
        
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            })
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Enter valid email",
                success: false
            })
        }

        const findUser = await User.findOne({email});
        // console.log(findUser)
        if(!findUser){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        const isMatchedPassword = await bcrypt.compare(password,findUser.password);
        // console.log('isMatchedPassword', isMatchedPassword)
        if(!isMatchedPassword || findUser.role !==role){
            return res.status(400).json({
                message: "Wrong credentials",
                success: false
            })
        }

        const token = generateToken(findUser._id,findUser.role);

        return res.status(200).json({
            message: "Login successfully",
            success: true,
            user: {
                id: findUser._id,
                fullname: findUser.fullname,
                email: findUser.email,
                role: findUser.role,
                token
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}
export const check=async(req,res)=>{
    const user=req.user;
    // console.log(user)
    res.status(200).json({message:"verified",user});
}

export const logout = async (req, res) => {
    return res.status(200).json({
        message: "Logout successful",
        success: true
    })
}
export const adminfetch=async(req,res)=>{
    try {
        const response= await User.find();
        res.status(200).json({message:"datafetched",data:response})
    } catch (error) { 
        res.status(400).json({message:"error occured",error:error})
    }
    
}
export const admindel=async(req,res)=>{
    try {
        const {email}=req.body
        await User.delete({email})
        res.status(200).json({message:"user deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"error occured",error:error})
    }
}

export const profile=async(req,res)=>{
    const userId=req.user.id;
    console.log(userId)
    try {
        const ans=await User.findById(userId)
        console.log(ans)
        return res.status(200).json({
            message:"profile loaded",
            success:true,
            ans
        })
    } catch (error) {
        return res.status(500).json({
            message:"error occured ",
            success:false,
            error:error
        })
    }
}