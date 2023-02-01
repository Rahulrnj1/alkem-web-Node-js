const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Doctor = require("../../model/Doctor");
const Pledge = require("../../model/Pledge")
const User = require("../../model/user")
const mongoose = require('mongoose');
const Getsmpledges = async (req, res) => {
    try {

        //console.log(req.userData);
        
        let query = {
            smid: mongoose.Types.ObjectId(req.userData.uid)

        }
        console.log(req.userData.uid);
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
                $lookup: {
                    from: "user",
                    localField: "mrid",
                    foreignField: "_id",
                    as: "mrinfo",
                },
            },
            {  
                $unwind: "$mrinfo"
            },
            {
                $project: {
                    doctorid: 1,
                    mrid: 1,
                    month: 1,
                    brand: 1,
                    numberOfRXs: 1,
                    status: 1,
                    totalValue: 1,
                    doctorname: "$doctorinfo.doctor_name",
                    mrname: "$mrinfo.name"
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

module.exports = { Getsmpledges }