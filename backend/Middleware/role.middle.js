export const authrole=(roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(roles.user.role)){
            return res.json(403).json({message:"access granted"})
        }    
        next();
    };
}
