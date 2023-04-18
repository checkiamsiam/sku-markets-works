const path = require('path');
const multer = require('multer');
const AppError = require('../util/appError');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest = 'upload';
        if(file.fieldname === 'avatar') {
            dest = 'upload/avatar';
        } else if (file.fieldname === 'cover') {
            dest = 'upload/cover';
        } else if (file.fieldname === 'docs') {
            dest = 'upload/docs';
        }
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const userId = req?.user?._id;
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
            '-' +
            Date.now();

        if (userId) {
            cb(null, `user-${userId}-${fileName}${fileExt}`);
        } else {
            cb(null, fileName + fileExt);
        }
    },
});

// const fileFilter = (req: any, file: any, cb: FileFilterCallback) => {
const fileFilter = (req, file, cb) => {
    // first check the mimetype of the file
    // if (file.mimetype.startsWith('image')) {
    //     if (
    //         file.mimetype === 'image/jpeg' ||
    //         file.mimetype === 'image/png' ||
    //         file.mimetype === 'image/jpg' ||
    //         file.mimetype === 'image/gif' ||
    //         file.mimetype === 'image/svg+xml' ||
    //         file.mimetype === 'image/webp' ||
    //         file.mimetype === 'image/bmp'
    //     ) {
    //         cb(null, true);
    //     } else {
    //         cb(
    //             new AppError(
    //                 'Only jpeg, png, jpg, gif, svg+xml, webp, bmp file are allowed!',
    //                 400
    //             )
    //         );
    //     }
    // }

    if (file.fieldname === 'avatar') {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/gif' ||
            file.mimetype === 'image/svg+xml' ||
            file.mimetype === 'image/webp' ||
            file.mimetype === 'image/bmp'
        ) {
            cb(null, true);
        } else {
            cb(
                new AppError(
                    'Only jpeg, png, jpg, gif, svg+xml, webp, bmp file are allowed!',
                    400
                )
            );
        }
    } else if (file.fieldname === 'cover') {
         if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/gif' ||
            file.mimetype === 'image/svg+xml' ||
            file.mimetype === 'image/webp' ||
            file.mimetype === 'image/bmp'
        ) {
            cb(null, true);
        } else {
            cb(
                new AppError(
                    'Only jpeg, png, jpg, gif, svg+xml, webp, bmp file are allowed!',
                    400
                )
            );
        }
    } else if (file.fieldname === 'video') {
        if (
            file.mimetype === 'video/mp4' ||
            file.mimetype === 'video/webm' ||
            file.mimetype === 'video/ogg'
        ) {
            cb(null, true);
        } else {
            cb(new AppError('Only mp4, webm, ogg file are allowed!', 400));
        }
    } else if (file.fieldname === 'audio') {
        if (
            file.mimetype === 'audio/mpeg' ||
            file.mimetype === 'audio/ogg' ||
            file.mimetype === 'audio/wav'
        ) {
            cb(null, true);
        } else {
            cb(new AppError('Only mp3, ogg, wav file are allowed!', 400));
        }
    } else if (file.fieldname === 'text') {
        if (file.mimetype === 'text/plain') {
            cb(null, true);
        } else {
            cb(new AppError('Only txt file are allowed!', 400));
        }
    } else if (file.fieldname === 'docs') {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new AppError('Only pdf file are allowed!', 400));
        }
    } else {
        cb(new AppError('Invalid file type', 400));
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
