import express from 'express';
import { userLogin, preRegister, userRegister } from './controllers/authController'

const router = express.Router();

router.post('/login', userLogin);
router.post('/pre', preRegister);
router.post('/register', userRegister);

export default router;
