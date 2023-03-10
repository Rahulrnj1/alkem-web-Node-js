const express = require("express");
const router = express.Router();
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
const { adminRegisterSchema, adminLoginSchema } = require("../middleware/Admin.joi")
const { doctorSchema, UpdatedoctorSchema } = require("../middleware/Doctor.joi")

const { doctorAssignSchema } = require("../middleware/DoctorAssign.joi")

const { checkAuth } = require('../middleware/jwt')

const adminControllers = require("../controllers/Admin/Admin.Auth.controller")
const doctorassigncontroller = require("../controllers/Admin/Admin.Doctor.controller")
const smcontroller = require("../controllers/Admin/Admin.Sm.controller");
const adminDotorcontroller = require("../controllers/Admin/Admin.Doctor.controller")
const { smSchema, UpdatesmSchema } = require("../middleware/Sm.joi")



router.post('/register', adminRegisterSchema, adminControllers.adminRegister);
router.post('/login', adminLoginSchema, adminControllers.adminlogin);
//Admin to SM
router.post('/addsm', checkAuth('admin'), smSchema, smcontroller.addSm);
router.get('/getsm', checkAuth('admin'), smcontroller.GetSm);
router.put('/editsm/:id', checkAuth('admin'), UpdatesmSchema, smcontroller.UpdateSm);
router.delete('/deletesm/:id', checkAuth('admin'), smcontroller.DeleteSm);
router.get('/getsinglesm/:id', checkAuth('admin'), smcontroller.GetsingleSm);

//Admin Doctor Assign Mr
router.post('/DoctorAssignMr', checkAuth('admin'), doctorAssignSchema, doctorassigncontroller.addAssigndoctor);

// Admin to Doctor create
router.post('/adAdmindoctor', checkAuth('admin'), upload.single('doctor_image'), doctorSchema, adminDotorcontroller.createdoctor);







module.exports = router;