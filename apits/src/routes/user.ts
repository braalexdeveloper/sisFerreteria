import express from 'express';
const router = express.Router();

// Importar controlador
import userController from '../controllers/user';
import { checkJwt } from '../middlewares/session';
import { logMiddleware } from '../middlewares/log';

router.get('/',checkJwt, userController.allUsers);
router.post('/',checkJwt, userController.createUser);
router.get('/:id',checkJwt, userController.getUser);
router.put('/:id',checkJwt, userController.updateUser);
router.delete('/:id',checkJwt, userController.deleteUser);

export default router;