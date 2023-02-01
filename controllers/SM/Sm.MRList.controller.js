const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user")
const GetallMR = async (req, res) => {
    try {
        // console.log(req.userData)


        const user = await User.find({smid: req.userData.uid }).sort();
        return res.status(200).json({ status: 200, message: "Get All MR succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
module.exports = {GetallMR}