import { Auth } from "../interfaces/auth.interface";
import { User  } from "../interfaces/user.interface";
import { models } from "../db";

const { User }=models;

import { encrypt,verified } from "../utils/bcrypt.handle";
import {  generateToken } from "../utils/jsw.handle";

const registerNewUser=async({email,password,name}:User)=>{
 const checkIs=await User.findOne({where:{email}})
 if(checkIs) return "Ya existe el usuario";
 const passHash=await encrypt(password);
 const registerNew=await User.create({email,password:passHash,name})
 return registerNew;
}


const loginUser=async({email,password}:Auth)=>{
    const checkIs=await User.findOne({where:{email}});
    if(!checkIs) throw "NOT_FOUND_USER";
    const isCorrect=await verified(password,checkIs.password);
    if(!isCorrect) throw "PASSWORD_INCORRECT";
    const token=generateToken(checkIs.email);
    await User.update({token},{where:{email}});
    return {
        token,
        user:checkIs
    };
    }

    const logout=async(id:string)=>{
        await User.update({token:null},{where:{id}});
        return "Deslogueado!"
    }

    export {registerNewUser,loginUser,logout};