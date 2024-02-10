import express from 'express';
const router = express.Router();

// Importar controlador
import categoryController from '../controllers/category';
import { checkJwt } from '../middlewares/session';

router.get('/',checkJwt, categoryController.allCategories);
router.post('/',checkJwt, categoryController.createCategory);
router.get('/:id',checkJwt, categoryController.getCategory);
router.put('/:id',checkJwt, categoryController.updateCategory);
router.delete('/:id',checkJwt, categoryController.deleteCategory);

export default router;
