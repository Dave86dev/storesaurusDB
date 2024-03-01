import express from 'express';
import upload from '../middlewares/multerConfig';
import { uploadFile, checkFile } from './fileController';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.post('/analysis', checkFile)

export default router;