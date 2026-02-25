import jwt from "jsonwebtoken"
export const verifyToken =(req,res,next)=>{
    try{
        const token = req.header.authorization;
        if (!token){
            return res.status(401).json({
                message:"Unauthorized access",
                success:false
            })

        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        next();
    }catch (error){
        return res.status(401).json({
            message:"Invalid token",
            success:false,
            error:error.message

    })
    }
}