const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user")

const GetallRM = async (req, res) => {
    try {

        const user = await User.find({smid: req.userData.uid }).sort();
        console.log(req.userData.uid)

        return res.status(200).json({ status: 200, message: "Get All RM succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
module.exports = {GetallRM}