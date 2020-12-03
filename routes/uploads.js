const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const helpers = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
router.post('/',auth, (req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('file');

    upload(req, res, function(err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`${req.file.filename}`);
    });
});

module.exports = router;
// heroku config:set dogluv_jwtPrivateKey=mySecureKey
// heroku config:set dogluv_db=mongodb+srv://newuser:1234@cluster0.mdg6o.mongodb.net/dogluv?retryWrites=true&w=majority