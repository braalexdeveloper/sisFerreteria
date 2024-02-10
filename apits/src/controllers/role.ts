import { Response,Request } from "express";
import { models } from "../db";
const {Role} =models;

const roleController={
 allRoles:async(req:Request,res:Response)=>{
   try {
     const roles=await Role.findAll();
     return res.status(200).json({
        message:"success",
        roles
     })
   } catch (error:any) {
    return res.status(500).json({ error: error.message });
   }
 },
 createRole:async(req:Request,res:Response)=>{
  try {
    if(!req.body.name){
   return res.status(400).json({error:"El campo nombre es requerido"});
    }
    let role=await Role.create(req.body);
    return res.status(200).json({
        message:"Rol creado correctamente!",
        role
     });
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
 },
 getRole: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).json({ error: "No se encontró la categoría" });
      }

      return res.status(200).json({
        role,
      });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  },
 updateRole: async (req: Request, res: Response) => {
    try {
      // Realizar la actualización y obtener el número de filas actualizadas
      const [updatedRowCount] = await Role.update(req.body, { where: { id: req.params.id } });

      if (updatedRowCount > 0) {
        // Si se actualizó al menos una fila, realizar una consulta para obtener la categoría actualizada
        const updatedRole = await Role.findByPk(req.params.id);

        res.status(200).json({
          message: "Rol actualizada correctamente",
          role: updatedRole,
        });
      } else {
        res.status(404).json({
          message: "No se encontró la Rol para actualizar",
        });
      }
    } catch (error:any) {
      console.error("Error al actualizar el rol:", error);
      res.status(500).json({
        message: "Error interno al actualizar el rol",
        error: error.message,
      });
    }
  },

  deleteRole: async (req: Request, res: Response) => {
    try {
      await Role.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        message: "Role eliminada correctamente",
      });
    } catch (error:any) {
      res.status(500).json({
        message: "Error interno al eliminar el rol",
        error: error.message,
      });
    }
  },
}

export default roleController;