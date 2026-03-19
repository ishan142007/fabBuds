export const authrole=(...roles)=>{

    return(req,res,next)=>{

        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"access not granted"})
        }    
        next();
    };
}
