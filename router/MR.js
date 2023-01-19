const express = require("express");
const router = express.Router();
const { Mrloginschema } = require("../middleware/Mr.joi")
const Mrcontroller = require("../controllers/MR/Mr.Auth.controller");

router.post('/mrlogin', Mrloginschema, Mrcontroller.Mrlogin);


module.exports = router;