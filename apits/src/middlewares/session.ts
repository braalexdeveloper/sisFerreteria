import { NextFunction,Request,Response } from "express";
import { verifyToken } from "../utils/jsw.handle";
import { JwtPayload } from "jsonwebtoken";
import { models } from "../db";

interface RequestExt extends Request{
    user?:string|JwtPayload;
}

const checkJwt=async(req:RequestExt,res:Response,next:NextFunction)=>{
 try {
    const jwtByUser=req.headers.authorization || '';
    const jwt=jwtByUser.split(' ').pop();
    const isUser=verifyToken(`${jwt}`);
    if(!isUser) return res.status(401).json({msg:"Error token invalido"})
     // Verificar el tipo de isUser antes de acceder a la propiedad id
     if (typeof isUser === 'string') {
        // Manejar el caso en el que isUser es una cadena
        // Puedes decidir qué hacer en este caso
        return res.status(401).json({ msg: "Error: Token contiene una cadena en lugar de un objeto" });
      }
    req.user=isUser;
   
   let userFound=await models.User.findOne({where:{email:isUser.id}});
   console.log(jwt)
   if(userFound.token==jwt){
    next();
   }else{
    return  res.status(401).json({ msg: "Error: Token invalido" });
   }
    
   
 } catch (error) {
    res.status(400).json({error});
 }
}

export { checkJwt };