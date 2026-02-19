import jwt from "jsonwebtoken"

export const isAuth=(req, res,next)=>{
    try {
        let {token}=req.cookies
        if(!token){
            return res.status(400).json({message:"Token is not found"})
        }
        let verifyToken=jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"Token is not valid"})
        }
        req.userId=verifyToken.userId
        next()
    } catch (error) {
        return res.status(500).json({message:`Authentication failed ${error}`})
    }
}

