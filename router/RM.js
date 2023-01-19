const express = require("express");
const router = express.Router();
const { Rmloginschema } = require("../middleware/Rm.joi")
const Rmcontroller = require("../controllers/RM/RM.Auth.controller");

//MR
const { AddMrSchema, UpdateMrSchema } = require("../middleware/Mr.joi")
const Mrcontroller = require("../controllers/RM/RM.MR.controller");

const { checkAuth } = require('../middleware/jwt')
//RM login
router.post('/rmlogin', Rmloginschema, Rmcontroller.RMlogin);

//MR
router.post('/addMr', checkAuth('RM'), AddMrSchema, Mrcontroller.addMR);
router.get('/getmr', checkAuth('RM'), Mrcontroller.GetMR);
router.put('/editmr/:id', checkAuth('RM'), UpdateMrSchema, Mrcontroller.UpdateMR);
router.delete('/deletemr/:id', checkAuth('RM'), Mrcontroller.DeleteMr);
router.get('/getmrdetails/:id', checkAuth('RM'), Mrcontroller.GetMrdetails);


module.exports = router;