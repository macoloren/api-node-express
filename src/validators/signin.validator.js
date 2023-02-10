import { check } from "express-validator";
import validateResult from "../helpers/validateHelper";

const validateSignin = [ 
    check('email')
    .exists()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .isLength({ min: 3 })
    .withMessage('Minimo 3 caracteres')
    .isLength({ max: 100 })
    .withMessage('Maximo 100 caracteres')
    .isEmail()
    .withMessage('Tiene que ser un Email valido'),

    check('password')
    .exists()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),

    
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

export default validateSignin