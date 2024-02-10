import { Request, Response } from "express";
import { registerNewUser,loginUser,logout } from "../service/auth";

const registerCtrl=async(req:Request,res:Response)=>{
const responseUser=await registerNewUser(req.body);
res.send(responseUser);
}


const loginCtrl=async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
    const responseUser=await loginUser({email,password});
    
    res.send(responseUser);
    } catch (error) {
        res.status(401).send(error);
    }
    
}

const logoutUser=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
    const responseUser=await logout(id);
    
    return res.status(200).json({message:responseUser});
    } catch (error) {
        return res.status(401).send(error);
    }
    
}

export { registerCtrl,loginCtrl,logoutUser };