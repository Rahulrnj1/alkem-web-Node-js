const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Doctor = require("../../model/Doctor")
const User = require("../../model/user")
const DoctorAssign = require("../../model/DoctorAssign")

const addAssigndoctor = async (req, res) => {

    try {

        const userdetails = await User.findOne({ _id: req.body.mrid })
        var dsmid = userdetails.dsmid
        var smid = userdetails.smid
        var rmid = userdetails.rmid

        for (let i = 0; i < req.body.doctor.length; i++) {

            var doctorid = req.body.doctor[i];


            let DoctorAssigns = new DoctorAssign({ dsmid: dsmid, smid: smid, rmid: rmid, mrid: mrid, doctorid: doctorid });

            DoctorAssigns = await DoctorAssigns.save();
        }
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }

}





module.exports = { addAssigndoctor }