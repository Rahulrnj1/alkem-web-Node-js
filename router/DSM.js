const express = require("express");
const router = express.Router();
const { DSmloginschema } = require("../middleware/Dsm.joi")
const Dsmcontroller = require("../controllers/DSM/DSm.Auth.controller");
const { rmSchema, UpdateRmSchema } = require("../middleware/Rm.joi")

const Rmcontroller = require("../controllers/DSM/DSm.Rm.controller")

const { checkAuth } = require('../middleware/jwt')
//login DSm
router.post('/dsmlogin', DSmloginschema, Dsmcontroller.DSmlogin);

// RM
router.post('/addRM', checkAuth('DSm'), rmSchema, Rmcontroller.addRm);
router.get('/getallrm', checkAuth('DSm'), Rmcontroller.GetRM);
router.put('/editRm/:id', checkAuth('DSm'), UpdateRmSchema, Rmcontroller.UpdateRM);
router.delete('/deleteRm/:id', checkAuth('DSm'), Rmcontroller.DeleteRm);
router.get('/getrmdetails/:id', checkAuth('DSm'), Rmcontroller.GetRMdetails);

module.exports = router;