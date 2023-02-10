import { check } from "express-validator";
import validateResult from "../helpers/validateHelper";

// validando campos de producto
const validateCreate = [ 
    check('name')
    .exists()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .isLength({ min: 3 })
    .withMessage('Minimo 3 caracteres')
    .isLength({ max: 100 })
    .withMessage('Maximo 100 caracteres'),

    check('category')
    .exists()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .isLength({ min: 3 })
    .withMessage('Minimo 3 caracteres')
    .isLength({ max: 100 })
    .withMessage('Maximo 100 caracteres'),

    check('price')
    .exists()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .isNumeric()
    .withMessage('Deve ser numerico'),

    check('imgURL')
    .exists()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),

    
    (req, res, next) => {
        validateResult(req, res, next)
    }
];


export default validateCreate