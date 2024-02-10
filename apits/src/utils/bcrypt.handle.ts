import { hash,compare } from "bcryptjs";

const encrypt=async(pass:string)=>{
  const passHah=await hash(pass,8);
  return passHah;
}

const verified=async(pass:string,passHash:string)=>{
    const isCorrect=await compare(pass,passHash);
    return isCorrect;
}

export { encrypt,verified };