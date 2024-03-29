import express from 'express';
const router=express.Router();

// Importar controlador
import saleController from '../controllers/sale';
import { checkJwt } from '../middlewares/session';

router.get('',saleController.allSales);
router.get('/:id',saleController.getSale);
router.post('',saleController.createSale);


export default router;