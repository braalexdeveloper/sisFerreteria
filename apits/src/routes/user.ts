import express from 'express';
const router = express.Router();

import multer from 'multer';
import path from 'path';

const uploadDirectory=path.join(__dirname,'../uploads/users');

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
import userController from '../controllers/user';
import { checkJwt } from '../middlewares/session';
import { logMiddleware } from '../middlewares/log';

router.get('/',checkJwt, userController.allUsers);
router.post('/',checkJwt,upload.single('avatar'),userController.createUser);
router.get('/:id',checkJwt, userController.getUser);
router.put('/:id',checkJwt,upload.single('avatar'),userController.updateUser);
router.delete('/:id',checkJwt, userController.deleteUser);

export default router;