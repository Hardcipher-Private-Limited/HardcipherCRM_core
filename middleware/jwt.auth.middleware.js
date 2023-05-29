const JWT=require('jsonwebtoken')
const config=require('../config/config')
const User=require('../models/user.model')
const bcrypt=require('bcryptjs')

const secret =process.env.JWT_SECRET

const authenticaion=async(req,res,next)=>{
const authHedaer=req.headers['authorization'];
const token=authHedaer && authHedaer.split(' ')[1]
if(token==null){
    return res.status(401).json({status:false,message:'token not found'})
    }
    try{
        const decoded=JWT.verify(token,secret)
        req.user=await User.findById(decoded.id).select('-password')
        next()
    }catch(err){
        res.status(401).json({status:false,message:'token not found'})
    }
    
}
const authorization=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({status:false,message:'unauthorized'})
        }
        next()
    }
}
module.exports={authenticaion,authorization}
