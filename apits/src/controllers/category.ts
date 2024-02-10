import { Request, Response } from 'express';
import { models } from '../db';

const { Category }=models;

const categoryController = {
  allCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll();
      return res.status(200).json({
        categories,
      });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCategory: async (req: Request, res: Response) => {
    try {

      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: "No se encontró la categoría" });
      }

      return res.status(200).json({
        category,
      });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  },

  createCategory: async (req: Request, res: Response) => {
    try {
      if(!req.body.name){
       throw "El campo nombre es obligatorio";
      }
      const category = await Category.create(req.body);
      res.status(200).json({
        message: "Categoría creada correctamente",
        category,
      });
    } catch (error:any) {
      console.error("Error al crear la categoría:", error);
      res.status(500).json({
        message: "Error interno al crear la categoría",
        error: error.message,
      });
    }
  },

  updateCategory: async (req: Request, res: Response) => {
    try {
      // Realizar la actualización y obtener el número de filas actualizadas
      const [updatedRowCount] = await Category.update(req.body, { where: { id: req.params.id } });

      if (updatedRowCount > 0) {
        // Si se actualizó al menos una fila, realizar una consulta para obtener la categoría actualizada
        const updatedCategory = await Category.findByPk(req.params.id);

        res.status(200).json({
          message: "Categoría actualizada correctamente",
          category: updatedCategory,
        });
      } else {
        res.status(404).json({
          message: "No se encontró la categoría para actualizar",
        });
      }
    } catch (error:any) {
      console.error("Error al actualizar la categoría:", error);
      res.status(500).json({
        message: "Error interno al actualizar la categoría",
        error: error.message,
      });
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    try {
      await Category.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        message: "Categoría eliminada correctamente",
      });
    } catch (error:any) {
      res.status(500).json({
        message: "Error interno al eliminar la categoría",
        error: error.message,
      });
    }
  },
};

export default categoryController;
