const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Doctor = require("../../model/Doctor")
const User = require("../../model/user")
const DoctorAssign = require("../../model/DoctorAssign")
const { parse } = require('json2csv');
const fs = require("fs");
var mongoose = require('mongoose');

//const User = require('../../model/user');
const exportss = async (req, res) => {
    Doctor.find({}, { _id: 0, createdAt: 0, updatedAt: 0 }, (err, Doctor) => {
        console.log("Doctor", Doctor);
        const fields = ['doctor_name', 'additional_qualification', 'phone_number'];
        const opts = { fields };
        try {
            const csv = parse(Doctor, opts);
            fs.writeFile("doctor.csv", csv, function (error) {
                if (error) throw error;
                console.log("write successfully");

            });
            console.log(csv);
            return res.status(200).json({ status: 200, message: "Csv created successfully" });


        } catch (err) {
            console.error(err)
            return res.status(400).json({ status: 400, error: err.message, message: "invalid " });

        }
    })

}
const adddoctor = async (req, res) => {

    console.log(req.userData);
    try {

        const userdetails = await User.findOne({ _id: req.userData.uid })
        req.body.dsmid = userdetails.dsmid
        req.body.smid = userdetails.smid
        req.body.rmid = userdetails.rmid


        req.body.mrid = req.userData.uid
        let fileName = req.file.filename;
        // console.log(fileName);

        req.body.doctor_image = fileName;
        // >db.userdetails.find().limit(2).pretty();

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
        const doctor = await DoctorAssign.find({ mrid: req.userData.uid }).sort();



        let query = {
            mrid: mongoose.Types.ObjectId(req.userData.uid)
        }

        const aggreagate = [
            { $match: query },

            {
                //join query
                $lookup: {
                    from: "doctor",
                    localField: "doctorid",
                    foreignField: "_id",
                    as: "doctorinfo",
                }
            },
            { $unwind: "$doctorinfo" },
            {
                $addFields: {
                    'dname': "$doctorinfo.doctor_name"
                }
            }, {
                $project: {
                    doctorinfo: 0
                }
            }
        ]

        const doctors = await DoctorAssign.aggregate(aggreagate);

        if (Object(doctors).length === 0) {
            return res.status(200).json({ status: 200, message: "Get All doctor succesfully", data: [] });
        }
        else {
            return res.status(200).json({ status: 200, message: "Get All doctor succesfully", data: doctors });
        }

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

module.exports = { adddoctor, Getdoctor, Updatedoctor, Deletedoctor, Getsingledoctor, exportss }