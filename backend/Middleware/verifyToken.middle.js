import jwt from "jsonwebtoken"
export const verifyToken =(req,res,next)=>{
    try{
        let token = req.headers.authorization;
        token=token.split(" ")[1];
        
        
        if (!token){
            return res.status(401).json({
                message:"Unauthorized access",
                success:false
            })

        }
        jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,decoded)=>{
            req.user=decoded;
            console.log(req.user)
            next();
        });
    }catch (error){
        return res.status(401).json({
            message:"Invalid token",
            success:false,
            error:error.message

    })
    }
}