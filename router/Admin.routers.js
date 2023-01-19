const express = require("express");
const router = express.Router();
const { adminRegisterSchema, adminLoginSchema } = require("../middleware/Admin.joi")

const { checkAuth } = require('../middleware/jwt')

const { userSchema, Updateuserschema } = require("../middleware/User.joi")
const usercontroller = require("../controllers/Admin/Admin.Headquarters.controller");
const adminControllers = require("../controllers/Admin/Admin.Auth.controller")

router.post('/register', adminRegisterSchema, adminControllers.adminRegister);
router.post('/login', adminLoginSchema, adminControllers.adminlogin);
//Admin to headquarters
router.post('/headquarters', checkAuth('admin'), userSchema, usercontroller.Headquarters);
router.get('/Getheadquarters', checkAuth('admin'), usercontroller.GetHeadquarters);
router.put('/Updateheadquarters/:id', checkAuth('admin'), Updateuserschema, usercontroller.UpdateHeadquarters);
router.delete('/deleteheadquarters/:id', checkAuth('admin'), usercontroller.DeleteHeadquarters);
router.get('/Getheadquarters/:id', checkAuth('admin'), usercontroller.Getheadquarters);





module.exports = router;