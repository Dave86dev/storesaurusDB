import express from 'express';
import { postRegister, postLogin } from './controllers/authController'

const router = express.Router();

router.post('/login', postLogin);
router.post('/register', postRegister);

export default router;
