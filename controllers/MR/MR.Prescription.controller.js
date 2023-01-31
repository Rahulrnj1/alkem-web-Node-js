const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Prescription = require("../../model/Prescription");
const User = require("../../model/user");

const mongoose = require('mongoose');
const addPrescription = async (req, res) => {
    try {
        console.log(req.userData);
        const userdetails = await User.findOne({ _id: req.userData.uid })
        req.body.dsmid = userdetails.dsmid
        req.body.smid = userdetails.smid
        req.body.rmid = userdetails.rmid
        req.body.mrid = req.userData.uid
        req.body.status = "submit to RM"


        let prescription = new Prescription(req.body);
        prescription = await prescription.save();


        return res.status(200).json({ status: 200, message: "Prescription created successfully", data: prescription });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}
const GetPrescription = async (req, res) => {
    try {
        console.log(req.userData.uid)


        // const prescription = await Prescription.find(
        //     {
        //         mr_id: mongoose.Types.ObjectId(req.userData.uid)
        //     }
        // ).sort();

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
                $project: {
                    doctorid: 1,
                    mrid: 1,
                    month: 1,
                    brand: 1,
                    numberOfRXs: 1,
                    status: 1,
                    totalValue: 1,
                    doctorname: "$doctorinfo.doctor_name"
                }
            }
        ]

        const prescription = await Prescription.aggregate(aggreagate);

        if (Object(prescription).length === 0) {
            return res.status(200).json({ status: 200, message: "Get All Prescription succesfully", data: [] });
        }
        else {

            // for (let i = 0; i < prescription.length; i++) {

            //     var doctorid = prescription[i].doctor;

            //     var doctorDetails = await Doctor.findOne({_id : doctorid});
            //     prescription[i].doctor_name = doctorDetails.doctor_name;
            //     prescription[i].doctor_pincode = doctorDetails.pincode;
            // }

            return res.status(200).json({ status: 200, message: "Get All Prescription succesfully", data: prescription });
        }
        //for loop
        //console.log('prescription==>', prescription);
        // let result = [];
        // for (let presc of prescription) {
        //     let doctorDetails = await Doctor.findOne(
        //         {
        //             _id: presc.doctor
        //         }
        //     ).sort();

        //     presc = presc.toObject();
        //     doctorDetails = doctorDetails.toObject()
        //     result.push(
        //         { ...presc, ...doctorDetails }
        //     );
        //     console.log(presc, doctorDetails);
        //     // presc.doctor_name = doctorDetails.doctor_name
        //     // Object.assign(presc, ...doctorDetails)
        // }



    }

    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};

const deletePrescription = async (req, res) => {

    const data = await Prescription.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const prescription = await Prescription.findByIdAndRemove(req.params.id);

        if (!prescription) return res.status(500).json({ status: 500, message: "The prescription is not present by id" })
        return res.status(200).json({ status: 200, message: "prescription Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The prescription is not present by id" });
    }

};






module.exports = { addPrescription, GetPrescription, deletePrescription }