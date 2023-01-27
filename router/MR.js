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
//const upload = multer({ storage: storage })
const pledgestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Pledge');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
    }

});
const upload = multer({ storage: pledgestorage })

//prescription
const { prescriptionSchema, UpdateprescriptionSchema } = require("../middleware/Prescription.joi")
const prescriptioncontroller = require("../controllers/MR/MR.Prescription.controller")

//pledge
const { pledgeSchema, UpdatepledgeSchema } = require("../middleware/Pledge.joi")
const pledgecontroller = require("../controllers/MR/MR.Pledge.controller");

//MR
const { Mrloginschema } = require("../middleware/Mr.joi")
const Mrcontroller = require("../controllers/MR/Mr.Auth.controller");

//Doctor
const { checkAuth } = require('../middleware/jwt')
const { doctorSchema, UpdatedoctorSchema } = require("../middleware/Doctor.joi")
const Dotorcontroller = require("../controllers/MR/MR.Doctor.controller");

router.post('/mrlogin', Mrloginschema, Mrcontroller.Mrlogin);

//Doctor
router.post('/adddoctor', checkAuth('MR'), upload.single('doctor_image'), doctorSchema, Dotorcontroller.adddoctor);
router.get('/getdoctor', checkAuth('MR'), Dotorcontroller.Getdoctor);
router.put('/editdoctor/:id', checkAuth('MR'), UpdatedoctorSchema, Dotorcontroller.Updatedoctor);
router.delete('/deletedoctor/:id', checkAuth('MR'), Dotorcontroller.Deletedoctor);
router.get('/getsingledoctor/:id', checkAuth('MR'), Dotorcontroller.Getsingledoctor);


//pledge
router.post('/addpledge', checkAuth('MR'), upload.single('image'), pledgeSchema, pledgecontroller.addpledge);
router.get('/getpledge', checkAuth('MR'), pledgecontroller.Getpledge);
router.put('/editpledge/:id', checkAuth('MR'), UpdatepledgeSchema, pledgecontroller.Updatepledge)
router.delete('/delpledge/:id', checkAuth('MR'), pledgecontroller.Deletepledge)
router.get('/getsinglepledge/:id', checkAuth('MR'), pledgecontroller.Getsinglepledge);

//prescription
router.post('/addprescription', checkAuth('MR'), prescriptionSchema, prescriptioncontroller.addPrescription);
router.get('/getprescription', checkAuth('MR'), prescriptioncontroller.GetPrescription);

router.delete('/delprescription/:id', checkAuth('MR'), prescriptioncontroller.deletePrescription)





module.exports = router;