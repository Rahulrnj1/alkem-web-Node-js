const express = require("express");
const router = express.Router();
const { Headquartersloginschema } = require("../middleware/User.joi")
const usercontroller = require("../controllers/Headquarters/Headquarters.Auth.controller");

const { smSchema, UpdatesmSchema } = require("../middleware/Sm.joi")

const smcontroller = require("../controllers/Headquarters/Headquarters.Sm.controller");
const { checkAuth } = require('../middleware/jwt')
//login
router.post('/Headquarterslogin', Headquartersloginschema, usercontroller.Headquarterslogin);


router.post('/addsm', checkAuth('headquarters'), smSchema, smcontroller.addSm);
router.get('/getsm', checkAuth('headquarters'), smcontroller.GetSm);
router.put('/editsm/:id', checkAuth('headquarters'), UpdatesmSchema, smcontroller.UpdateSm);
router.delete('/deletesm/:id', checkAuth('headquarters'), smcontroller.DeleteSm);
router.get('/getsinglesm/:id', checkAuth('headquarters'), smcontroller.GetsingleSm);

module.exports = router;