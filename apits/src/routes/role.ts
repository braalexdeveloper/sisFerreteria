import express from "express";
const router=express.Router();

import roleController from "../controllers/role";
import { checkJwt } from "../middlewares/session";

router.get('/',checkJwt,roleController.allRoles);
router.post('/',checkJwt, roleController.createRole);
router.get('/:id',checkJwt, roleController.getRole);
router.put('/:id',checkJwt, roleController.updateRole);
router.delete('/:id',checkJwt, roleController.deleteRole);

export default router;