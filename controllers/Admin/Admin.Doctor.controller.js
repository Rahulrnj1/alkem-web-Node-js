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

        if (userdetails) {
            // console.log(userdetails)
            const mrdoctorassigncount = await DoctorAssign.find({ mrid: req.body.mrid }).countDocuments();
            // console.log(req.body.doctorid)

            if (mrdoctorassigncount >= 80) {


                res.status(404).json({ error: { success: false, message: 'DoctorAssign Limit is Over ' } })
            }
            else {
                var AssignCount = 80 - mrdoctorassigncount;
                var newdoctorcount = req.body.doctorid.length;
                if (newdoctorcount > AssignCount) {
                    res.status(404).json({ error: { success: false, message: "doctorAssign Limit is " + AssignCount } })
                }
                else {

                    var dsmid = userdetails.dsmid
                    var smid = userdetails.smid
                    var rmid = userdetails.rmid
                    var mrid = req.body.mrid

                    for (let i = 0; i < req.body.doctorid.length; i++) {

                        var doctorid = req.body.doctorid[i];
                        const doctorassigncheck = await DoctorAssign.find({ doctorid: doctorid, mrid: mrid }).countDocuments();


                        if (doctorassigncheck == 0) {
                            let DoctorAssigns = new DoctorAssign({ dsmid: dsmid, smid: smid, rmid: rmid, mrid: mrid, doctorid: doctorid });


                            DoctorAssigns = await DoctorAssigns.save();

                        }


                    }

                    return res.status(200).json({ status: 200, message: "DoctorAssign successfully" });

                }

            }
        }
        else {
            return res.status(400).json({ status: 400, message: "user not found" });
        }
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }

}
const createdoctor = async (req, res) => {
    // console.log(req.userData)

    try {

        let fileName = req.file.filename;
        // console.log(fileName);
        req.body.doctor_image = fileName;
        // >db.userdetails.find().limit(2).pretty();
        let doctor = new Doctor(req.body);
        doctor = await doctor.save();
        // console.log(doctor);

        return res.status(200).json({ status: 200, message: " doctor created successfully", data: doctor });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}



module.exports = { addAssigndoctor, createdoctor }