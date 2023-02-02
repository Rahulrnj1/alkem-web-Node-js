const express = require("express");
const router = express.Router();
const { Rmloginschema } = require("../middleware/Rm.joi")
const Rmcontroller = require("../controllers/RM/RM.Auth.controller");

//MR
const { AddMrSchema, UpdateMrSchema } = require("../middleware/Mr.joi")

const Mrcontroller = require("../controllers/RM/RM.MR.controller");
const Rmdoctorcontroller = require("../controllers/RM/Rm.Doctor.controller")
const prescriptionscontroller = require("../controllers/RM/Rm.Prescription.controller")
const pledgecontroller = require("../controllers/RM/Rm.Pledge.controller")


const { checkAuth } = require('../middleware/jwt')
//RM login
router.post('/rmlogin', Rmloginschema, Rmcontroller.RMlogin);

//MR
router.post('/addMr', checkAuth('RM'), AddMrSchema, Mrcontroller.addMR);
router.get('/getmr', checkAuth('RM'), Mrcontroller.GetMR);
router.put('/editmr/:id', checkAuth('RM'), UpdateMrSchema, Mrcontroller.UpdateMR);
router.delete('/deletemr/:id', checkAuth('RM'), Mrcontroller.DeleteMr);
router.get('/getmrdetails/:id', checkAuth('RM'), Mrcontroller.GetMrdetails);

//Rm to doctor
router.get('/getdoctorlist', checkAuth('RM'), Rmdoctorcontroller.Getdoctor);


//prescription
router.get('/getprescriptionlist', checkAuth('RM'), prescriptionscontroller.GetPrescriptions);
//prdge
router.get('/getpledgelist', checkAuth('RM'), pledgecontroller.Getpledges);






module.exports = router;