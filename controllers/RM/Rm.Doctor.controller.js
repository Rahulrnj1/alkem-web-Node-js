const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Doctor = require("../../model/Doctor")
const Getdoctor = async (req, res) => {
    try {
       // console.log(req.userData)
        const doctor = await Doctor.find({ userid: req.userData.uid }).sort();
        return res.status(200).json({ status: 200, message: "Get All doctor succesfully", data: doctor });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
module.exports = { Getdoctor }