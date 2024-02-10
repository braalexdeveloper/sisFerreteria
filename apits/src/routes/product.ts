import express from 'express';
const router = express.Router();

import multer from 'multer';
import path from 'path';
// Directorio donde se guardarán las imágenes
const uploadDirectory=path.join(__dirname,'../uploads/products');

// Configuración de multer para almacenar archivos en el directorio de uploads
const storage=multer.diskStorage({
	destination:(req,file,cb)=>{
     cb(null,uploadDirectory);
	},
	filename:(req,file,cb)=>{
     cb(null,Date.now()+'-'+file.originalname);
	}
});

const upload=multer({storage:storage});

// Importar controlador
import productController from '../controllers/product';
import { checkJwt } from '../middlewares/session';

router.get('/',checkJwt, productController.allProducts);
router.post('/',checkJwt,upload.single('image'),productController.createProduct);
router.get('/:id',checkJwt, productController.getProduct);
router.put('/:id',checkJwt,upload.single('image'), productController.updateProduct);
router.delete('/:id',checkJwt, productController.deleteProduct);

export default router;
