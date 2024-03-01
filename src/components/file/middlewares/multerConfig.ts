import multer, { FileFilterCallback } from 'multer';
import { customRequest } from '../../../interfaces';

const allowedTypes: string[] = [
    'text/csv'
];

const fileFilter = (req: customRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Invalid file type';
        //bad news amigos...
        cb(null, false); 
    }
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
});

export default upload;
