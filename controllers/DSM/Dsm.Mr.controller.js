const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const Doctor = require("../../model/Doctor")
const User = require("../../model/user")
const GetMRlist = async (req, res) => {
    try {
        // console.log(req.userData)


        const user = await User.find({ dsmid: req.userData.uid }).sort();
        return res.status(200).json({ status: 200, message: "Get All MR succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
module.exports = { GetMRlist }