const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Doctor');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage })
//MR
const { Mrloginschema } = require("../middleware/Mr.joi")
const Mrcontroller = require("../controllers/MR/Mr.Auth.controller");

//Doctor
const { checkAuth } = require('../middleware/jwt')
const { doctorSchema } = require("../middleware/Doctor.joi")
const Dotorcontroller = require("../controllers/MR/MR.Doctor.controller");

router.post('/mrlogin', Mrloginschema, Mrcontroller.Mrlogin);

//Doctor
router.post('/adddoctor', checkAuth('MR'), upload.single('doctor_image'),doctorSchema, Dotorcontroller.adddoctor);




module.exports = router;