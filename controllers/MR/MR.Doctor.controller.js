const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Doctor = require("../../model/Doctor ")
const adddoctor = async (req, res) => {

    try {
        // console.log(req.userData);

        req.body.userid = req.userData.uid


        // req.body.usertype = "Doctor"
        let fileName = req.file.filename;
        // console.log(fileName);
        req.body.doctor_image = fileName;

        let doctor = new Doctor(req.body);
        doctor = await doctor.save();
        // console.log(doctor);


        return res.status(200).json({ status: 200, message: "Doctor created successfully", data: doctor });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}

module.exports = { adddoctor }