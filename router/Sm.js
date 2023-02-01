const express = require("express");
const router = express.Router();
const { Smloginschema } = require("../middleware/Sm.joi")
const { dsmSchema, UpdateDsmSchema } = require("../middleware/Dsm.joi")

const smcontroller = require("../controllers/SM/Sm.Auth.controller");
const dsmcontroller = require("../controllers/SM/Sm.Dsm.controller");
const smdsmcontroller = require("../controllers/SM/SM.DSMList.controller")

const smrmcontroller = require("../controllers/SM/SM.RMList.controller")
const smdoctorcontroller = require("../controllers/SM/Sm.DoctorList.controller")
const smmrcontroller = require("../controllers/SM/Sm.MRList.controller")
const smGetallPrescriptions = require("../controllers/SM/Sm.PrescriptionList.controller")
const smpledgecontroller = require("../controllers/SM/sm.pledge.controller")

const { checkAuth } = require('../middleware/jwt')
//login Sm
router.post('/smlogin', Smloginschema, smcontroller.Smlogin);

//Dsm
router.post('/adddsm', checkAuth('Sm'), dsmSchema, dsmcontroller.addDsm);
router.get("/getdsm", checkAuth('Sm'), dsmcontroller.GetDSm)
router.put('/editdsm/:id', checkAuth('Sm'), UpdateDsmSchema, dsmcontroller.UpdateDSm);
router.delete('/deletedsm/:id', checkAuth('Sm'), dsmcontroller.DeleteDSm);
router.get("/dsmDetails/:id", checkAuth('Sm'), dsmcontroller.GetsingleDSm)


//Dsm list 
router.get("/getalldsm", checkAuth('Sm'), smdsmcontroller.GetallDSm)


//Rm list
router.get("/getallrm", checkAuth('Sm'), smrmcontroller.GetallRM)

//mr list
router.get("/getallmr", checkAuth('Sm'), smmrcontroller.GetallMR)
//mr Getalldoctor
router.get("/getalldoctor", checkAuth('Sm'), smdoctorcontroller.Getalldoctor)

//GetallPrescriptions
router.get("/getallprescription", checkAuth('Sm'), smGetallPrescriptions.GetallPrescriptions)
//Getsmpledges
router.get("/getallprescription", checkAuth('Sm'), smpledgecontroller.Getsmpledges)





module.exports = router;