const express = require("express");
const router = express.Router();
const { Smloginschema } = require("../middleware/Sm.joi")
const { dsmSchema ,UpdateDsmSchema} = require("../middleware/Dsm.joi")

const smcontroller = require("../controllers/SM/Sm.Auth.controller");
const dsmcontroller = require("../controllers/SM/Sm.Dsm.controller");

const { checkAuth } = require('../middleware/jwt')
//login Sm
router.post('/smlogin', Smloginschema, smcontroller.Smlogin);

//Dsm
router.post('/adddsm', checkAuth('Sm'), dsmSchema, dsmcontroller.addDsm);
router.get("/getdsm", checkAuth('Sm'), dsmcontroller.GetDSm)
router.put('/editdsm/:id', checkAuth('Sm'), UpdateDsmSchema, dsmcontroller.UpdateDSm);
router.delete('/deletedsm/:id', checkAuth('Sm'), dsmcontroller.DeleteDSm);
router.get("/dsmDetails/:id",checkAuth('Sm'),dsmcontroller.GetsingleDSm)


module.exports = router;