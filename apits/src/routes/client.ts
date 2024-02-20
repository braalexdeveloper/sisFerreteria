import express from 'express';
const router=express.Router();

// Importar controlador
import clientController from '../controllers/client';
import { checkJwt } from '../middlewares/session';

router.get('',checkJwt,clientController.allClients);
router.post('',checkJwt,clientController.createClient);
router.put('/:id',checkJwt,clientController.updateClient);
router.delete('/:id',checkJwt,clientController.deleteClient);

export default router;