import express from 'express';
const router=express.Router();

// Importar controlador
import clientController from '../controllers/client';
import { checkJwt } from '../middlewares/session';

router.get('',clientController.allClients);
router.post('',clientController.createClient);
router.put('/:id',clientController.updateClient);
router.delete('/:id',clientController.deleteClient);

export default router;