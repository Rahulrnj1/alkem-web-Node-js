const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Doctor = require("../../model/Doctor")
const User = require("../../model/user")


const Getdsmdoctor= async (req, res) => {
    try {
        // console.log(req.userData)
        const doctor = await Doctor.find({ dsmid: req.userData.uid }).limit(30).sort();
        return res.status(200).json({ status: 200, message: "Get All doctor succesfully", data: doctor });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
module.exports = { Getdsmdoctor}