const express = require("express");
const router = express.Router();
const { DSmloginschema } = require("../middleware/Dsm.joi")
const Dsmcontroller = require("../controllers/DSM/DSm.Auth.controller");
const Dsmpledgecontroller = require("../controllers/DSM/Dsm.Pledge.controller")
const GetDsmPrescriptions = require("../controllers/DSM/Dsm.Prescription List.controller")
const { rmSchema, UpdateRmSchema } = require("../middleware/Rm.joi")

const Rmcontroller = require("../controllers/DSM/DSm.Rm.controller")
const Dsmscontroller = require("../controllers/DSM/Dsm.Doctor List.controller")
const dsmmrcontroller = require("../controllers/DSM/Dsm.Mr.controller")

const { checkAuth } = require('../middleware/jwt')
//login DSm
router.post('/dsmlogin', DSmloginschema, Dsmcontroller.DSmlogin);

// RM
router.post('/addRM', checkAuth('DSm'), rmSchema, Rmcontroller.addRm);
router.get('/getallrm', checkAuth('DSm'), Rmcontroller.GetRM);
router.put('/editRm/:id', checkAuth('DSm'), UpdateRmSchema, Rmcontroller.UpdateRM);
router.delete('/deleteRm/:id', checkAuth('DSm'), Rmcontroller.DeleteRm);
router.get('/getrmdetails/:id', checkAuth('DSm'), Rmcontroller.GetRMdetails);

//doctor
router.get('/getdoctorlist', checkAuth('DSm'), Dsmscontroller.Getdsmdoctor);

//mr 
router.get('/getmrlist', checkAuth('DSm'), dsmmrcontroller.GetMRlist);

//Getpledgess
router.get('/getpledgelist', checkAuth('DSm'), Dsmpledgecontroller.Getpledgess);

//GetDsmPrescriptions
router.get('/getdsmprescriptionlist', checkAuth('DSm'), GetDsmPrescriptions.GetDsmPrescriptions);



module.exports = router;