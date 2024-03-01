import express from 'express';
import upload from '../middlewares/multerConfig';
import { uploadFile } from './fileController';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router;