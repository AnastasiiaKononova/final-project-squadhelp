const fs = require('fs');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const env = process.env.NODE_ENV || 'development';
const CONSTANTS = require('../constants');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : CONSTANTS.CONTESTS_DEFAULT_DIR;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, filePath);
  },
  filename (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadAvatars = multer({ storage: storageContestFiles }).single('avatar');
const uploadContestFiles = multer({ storage: storageContestFiles }).array(
  'files', 3);
const updateContestFile = multer({ storage: storageContestFiles }).single(
  'file');
const uploadLogoFiles = multer({ storage: storageContestFiles }).single(
  'offerData');

module.exports.uploadAvatar = (req, res, next) => {
  uploadAvatars(req, res, (err) => {
    if (err instanceof multer.MulterError) {

      next(new ServerError(err.message));
    } else if (err) {
      next(new ServerError(err.message));
    }
    return next();
  });
};

const multerHandler = (uploadMiddleware) => (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if(err) {
      const message = err instanceof multer.MulterError ? err.message : (err?.message || 'File upload error');
      return next(new ServerError(message))
    }
    return next();
  });
};

module.exports.uploadAvatar = multerHandler(uploadAvatars);
module.exports.uploadContestFiles = multerHandler(uploadContestFiles);
module.exports.updateContestFile = multerHandler(updateContestFile);
module.exports.uploadLogoFiles = multerHandler(uploadLogoFiles);
