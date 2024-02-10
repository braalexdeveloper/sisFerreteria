import { Request, Response } from 'express';
import { models } from '../db';
const { User }=models;

const userController = {
  allUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
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
      const user = await User.create(req.body);
      res.status(200).json({
        message: "User creado correctamente",
        user,
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
      // Realizar la actualización y obtener el número de filas actualizadas
      const [updatedRowCount] = await User.update(req.body, { where: { id: req.params.id } });

      if (updatedRowCount > 0) {
        // Si se actualizó al menos una fila, realizar una consulta para obtener el usero actualizado
        const updateduser = await User.findByPk(req.params.id);

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
