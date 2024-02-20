import { Request, Response } from 'express';
import { models } from '../db';
const { User,Role }=models;
import fs from 'fs';
import path from 'path';
import { User } from '../interfaces/user.interface'

import { encrypt } from "../utils/bcrypt.handle"

const userController = {
  allUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({include:Role});
      return res.status(200).json({
        users,
      });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "No se encontró el user" });
      }

      return res.status(200).json({
        user,
      });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {

      const { name,email,password,RoleId }=req.body;

      let passHash=await encrypt(password);
      let pathAvatar='';

      if(req.file){
       pathAvatar='/users/'+req.file.filename;
      }

     

      const user = await User.create({ name,email,password:passHash,image:pathAvatar,RoleId });
      // Obtener el usuario recién creado incluyendo su rol asociado
const userWithRole = await User.findByPk(user.id, { include: Role });

      res.status(200).json({
        message: "User creado correctamente",
        user:userWithRole,
      });
    } catch (error:any) {
      console.error("Error al crear el user:", error);
      res.status(500).json({
        message: "Error interno al crear el user",
        error: error.message,
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {

      let user:User={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password || '',
        RoleId:req.body.RoleId
      }

if(!user.password){
  delete user.password;
}

      let imagePath='';

     if(req.file){
      let userFound=await User.findByPk(req.params.id);
if(userFound.image){
fs.unlinkSync(path.join(__dirname,'..','uploads',userFound.image));
}
       

       imagePath ="/users/"+req.file.filename;

        user={...user,image:imagePath}
     }
      // Realizar la actualización y obtener el número de filas actualizadas
      const [updatedRowCount] = await User.update(user, { where: { id: req.params.id } });

      if (updatedRowCount > 0) {
        // Si se actualizó al menos una fila, realizar una consulta para obtener el usero actualizado
        const updateduser = await User.findByPk(req.params.id,{include:Role});

        res.status(200).json({
          message: "user actualizado correctamente",
          user: updateduser,
        });
      } else {
        res.status(404).json({
          message: "No se encontró el user para actualizar",
        });
      }
    } catch (error:any) {
      console.error("Error al actualizar el user:", error);
      res.status(500).json({
        message: "Error interno al actualizar el user",
        error: error.message,
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        message: "user eliminado correctamente",
      });
    } catch (error:any) {
      res.status(500).json({
        message: "Error interno al eliminar el user",
        error: error.message,
      });
    }
  },
};

export default userController;
