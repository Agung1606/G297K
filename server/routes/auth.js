import express from 'express';
import { localVariables } from '../middleware/auth.js';
import { 
    verifyUser, 
    register, 
    registerUsername,
    login, 
    generateOTP, 
    verifyOTP,
} from '../controllers/auth.js';
const router = express.Router();

/* POST */
router.route('/register').post(register);
router.route('/login').post(login);

/* PATCH */
router.route('/register/username').patch(registerUsername);

/* GET */
router.route('/generateOTP').get(localVariables, generateOTP); // generate OTP
router.route('/verifyOTP').get(verifyOTP); // verify generated OTP


export default router;