import { Router } from "express";
import * as authCtrl  from "../controllers/auth.controller";
import validateSignup from "../validators/signup.validator";
import validateSignin from "../validators/signin.validator";



const router = Router();

router.post('/signin', validateSignin, authCtrl.signin)
router.post('/signup', validateSignup, authCtrl.signup)

export default router 