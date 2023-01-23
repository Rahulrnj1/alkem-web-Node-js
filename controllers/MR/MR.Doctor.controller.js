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

const Getdoctor = async (req, res) => {
    try {
        // console.log(req.userData)
        const doctor = await Doctor.find({ usertype: "Mr", userid: req.userData.uid }).sort();
        return res.status(200).json({ status: 200, message: "Get All doctor succesfully", data: doctor });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const Updatedoctor = async (req, res) => {

    // console.log(req.body)

    const data = await Doctor.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!doctor) return res.status(500).send({ status: 500, message: "the doctor with given ID", data: doctor });

        return res.status(200).json({ status: 200, message: "doctor updated successfully", data: doctor });
    }
    else {
        return res.status(500).json({ status: 500, message: "doctor is not found " });

    }
}
const Deletedoctor = async (req, res) => {

    const data = await Doctor.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const doctor = await Doctor.findByIdAndRemove(req.params.id);

        if (!doctor) return res.status(500).json({ status: 500, message: "The doctor is not present by id" })
        return res.status(200).json({ status: 200, message: "doctor Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The doctor is not present by id" });
    }

};
const Getsingledoctor = async (req, res) => {
    // console.log("234")
    // console.log(req.userData)
    try {
        const doctor = await Doctor.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The Doctor with the given ID", data: doctor });

        // res.send(Doctor);
    }
    catch (ex) {
        console.log(ex.message);
        if (!Doctor) return res.status(404).send('the Doctor with the given ID');

    }
};

module.exports = { adddoctor, Getdoctor, Updatedoctor, Deletedoctor, Getsingledoctor }