const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Pledge = require("../../model/Pledge")

var mongoose = require('mongoose');

const User = require("../../model/user")
const addpledge = async (req, res) => {

    try {
        // console.log(req.userData);
        const userdetails = await User.findOne({ _id: req.userData.uid })
        req.body.dsmid = userdetails.dsmid
        req.body.smid = userdetails.smid
        req.body.rmid = userdetails.rmid
        req.body.mrid = req.userData.uid
        let fileName = req.file.filename;
        req.body.doctor_name,
            req.body.month,
            req.body.status = "submit to RM",

            req.body.image = fileName;

        let pledge = new Pledge(req.body);
        pledge = await pledge.save();


        return res.status(200).json({ status: 200, message: "Pledge created successfully", data: pledge });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}
const Getpledge = async (req, res) => {
    try {
 

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

        const pledge = await Pledge.aggregate(aggreagate);

        if (Object(pledge).length === 0) {
            return res.status(200).json({ status: 200, message: "Get All pledge succesfully", data: [] });
        }
        else {



            return res.status(200).json({ status: 200, message: "Get All pledge succesfully", data: pledge });
        }



    }

    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};


const Updatepledge = async (req, res) => {

    // console.log(req.body)

    const data = await Pledge.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const pledge = await Pledge.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!pledge) return res.status(500).send({ status: 500, message: "the pledge with given ID", data: pledge });

        return res.status(200).json({ status: 200, message: "pledge updated successfully", data: pledge });
    }
    else {
        return res.status(500).json({ status: 500, message: "pledge is not found " });

    }
}
const Deletepledge = async (req, res) => {

    const data = await Pledge.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const pledge = await Pledge.findByIdAndRemove(req.params.id);

        if (!pledge) return res.status(500).json({ status: 500, message: "The pledge is not present by id" })
        return res.status(200).json({ status: 200, message: "Pledge Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The pledge is not present by id" });
    }

};
const Getsinglepledge = async (req, res) => {
    // console.log("234")
    // console.log(req.userData)
    try {
        const pledge = await Pledge.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The Pledge with the given ID", data: pledge });

        // res.send(pledge);
    }
    catch (ex) {
        console.log(ex.message);
        if (!Pledge) return res.status(404).send('the Doctor with the given ID');

    }
};

module.exports = { addpledge, Getpledge, Updatepledge, Deletepledge, Getsinglepledge }