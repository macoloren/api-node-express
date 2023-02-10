import { Router } from "express";
import * as productsCtrl from "../controllers/products.controllers";
import validateCreate from "../validators/products.validator";
import { authJwt } from "../middlewares/";


const router = Router();
//no tiene permisos de roles
router.get('/', productsCtrl.getProducts);
router.get('/:productId', productsCtrl.getProductById);

//si tiene permisos de roles
router.post('/',[authJwt.verifyToken, authJwt.isModerator], validateCreate, productsCtrl.createProduct);
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], validateCreate, productsCtrl.updateProductById);
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById);


export default router