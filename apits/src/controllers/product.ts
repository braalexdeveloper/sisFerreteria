import { Request, Response } from 'express';
import { models } from '../db';
import fs from 'fs';
import path from 'path';
import { Product } from '../interfaces/product.interface'
import { Op } from 'sequelize';

const productController = {
  allProducts: async (req: Request, res: Response) => {
    try {
      let products:Product[]=[];

      if(req.query.textSearch){
         // Realizar la búsqueda por nombre de producto o nombre de categoría
      products = await models.Product.findAll({
        include: {
          model: models.Category,
         
        },
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${req.query.textSearch}%` // Búsqueda parcial para el nombre del producto
              }
            },
            {
              '$Category.name$': {
                [Op.like]: `%${req.query.textSearch}%` // Búsqueda parcial para el nombre de la categoría a través de la asociación
              }
            }
          ]
        }
      });
      }else{
        products= await models.Product.findAll({
        include:{
          model:models.Category
        }
      });
      }
      

      const productsFormat=products.map((el:Product)=>{
         return {
           id:el.id,
           name:el.name,
           description:el.description,
           stock:el.stock,
           price:el.price,
           image:el.image,
           CategoryId:el.Category.id,
           category:el.Category.name
         }
      })
      return res.status(200).json({
        products:productsFormat,
      });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await models.Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "No se encontró el Producto" });
      }

      return res.status(200).json({
        product,
      });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req: Request, res: Response) => {
    try {
        let imagePath = '';
        if (req.file) {
            imagePath ="/products/"+req.file.filename;
            console.log(req.file.filename)
        }
        
       const {name,description,stock,price,CategoryId}=req.body
       if(!name || !stock || !price){
         throw "El campo name,stock y price son requeridos!";
       }
      const product = await models.Product.create({name,description,stock,price,image:imagePath,CategoryId});
      
      // Obtener el producto con su categoría asociada
const productWithCategory = await models.Product.findOne({
  where: { id: product.id },
  include: {
    model: models.Category,
    
  },
});

const productFormat={
           id:productWithCategory.id,
           name:productWithCategory.name,
           description:productWithCategory.description,
           stock:productWithCategory.stock,
           price:productWithCategory.price,
           image:productWithCategory.image,
           CategoryId:productWithCategory.Category.id,
           category:productWithCategory.Category.name
         }

      res.status(200).json({
        message: "Producto creado correctamente",
        product:productFormat,
      });
    } catch (error:any) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({
        message: "Error interno al crear el producto",
        error: error,
      });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
const {name,description,stock,price,CategoryId}=req.body
let dataProduct:Product={
  name,
  description,
  stock,
  price,
  CategoryId
}
      let imagePath = '';
        if (req.file) {
          let productFound = await models.Product.findByPk(req.params.id);
            imagePath ="/products/"+req.file.filename;
            
            fs.unlinkSync(path.join(__dirname, '..', 'uploads', productFound.image));
           dataProduct={...dataProduct,image:imagePath}
        }

         
       if(!name || !stock || !price){
         throw "El campo name,stock y price son requeridos!";
       }
      // Realizar la actualización y obtener el número de filas actualizadas
      const [updatedRowCount] = await models.Product.update(dataProduct, { where: { id: req.params.id } });

      if (updatedRowCount > 0) {
        // Si se actualizó al menos una fila, realizar una consulta para obtener el producto actualizado
        const updatedProduct = await models.Product.findOne({
  where: { id: req.params.id },
  include: {
    model: models.Category,
    
  },
});
        
    const productFormat={
           id:updatedProduct.id,
           name:updatedProduct.name,
           description:updatedProduct.description,
           stock:updatedProduct.stock,
           price:updatedProduct.price,
           image:updatedProduct.image,
           CategoryId:updatedProduct.Category.id,
           category:updatedProduct.Category.name
         }

        res.status(200).json({
          message: "Producto actualizado correctamente",
          product: productFormat,
        });
      } else {
        res.status(404).json({
          message: "No se encontró el producto para actualizar",
        });
      }
    } catch (error:any) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).json({
        message: "Error interno al actualizar el producto",
        error: error.message,
      });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const product = await models.Product.findByPk(req.params.id);
      await models.Product.destroy({ where: { id: req.params.id } });
      if(product.image){
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', product.image));
      }
      res.status(200).json({
        message: "Producto eliminado correctamente",
      });
    } catch (error:any) {
      res.status(500).json({
        message: "Error interno al eliminar el producto",
        error: error.message,
      });
    }
  },
};

export default productController;
