import express from 'express';
import { userLogin, preLogin, preRegister, userRegister } from './controllers/authController'
import { checkMailCode } from '../middlewares/checkMailCode';

const router = express.Router();

router.post('/login', checkMailCode, userLogin);
router.post('/prelogin', preLogin);
router.post('/preregister', preRegister);
router.post('/register', checkMailCode, userRegister);

export default router;
