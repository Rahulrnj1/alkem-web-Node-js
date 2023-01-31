const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user")
const addDsm = async (req, res) => {

    try {
        var hashedPassword = await bcrypt.hash(req.body.password, Config.SALT_WORK_FACTOR)
        req.body.password = hashedPassword
        const userdetails = await User.findOne({ _id: req.userData.uid })
        req.body.smid = req.userData.uid

        // console.log(userData )

        req.body.usertype = "Dsm"

        let user = new User(req.body);
        user = await user.save();


        return res.status(200).json({ status: 200, message: "Dsm created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}
const GetDSm = async (req, res) => {
    try {

        const user = await User.find({ usertype: "Dsm" }).sort();
        return res.status(200).json({ status: 200, message: "Get All DSm succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const UpdateDSm = async (req, res) => {

   // console.log(req.body)
    const data = await User.findOne({ employeeid: req.body.employeeid, isdeleted: false, _id: { $ne: req.params.id } })
    if (data) {
        return res.status(500).json({ status: 400, message: "employeeid is Already" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!user) return res.status(500).send({ status: 500, message: "the DSM with given ID", data: user });

    return res.status(200).json({ status: 200, message: "DSM updated successfully", data: user });
}
const DeleteDSm = async (req, res) => {

    const data = await User.findOne({ _id: req.params.id })
   // console.log(data)
    if (data) {
        const user = await User.findByIdAndRemove(req.params.id);

        if (!user) return res.status(500).json({ status: 500, message: "The DSM is not present by id" })
        return res.status(200).json({ status: 200, message: "DSM Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The DSM is not present by id" });
    }

};
const GetsingleDSm = async (req, res) => {
    // console.log("234")
    // console.log(req.userData)
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The DSm with the given ID", data: user });

        // res.send(user);
    }
    catch (ex) {
        console.log(ex.message);
        if (!User) return res.status(404).send('the DSM with the given ID');

    }
};
module.exports = { addDsm, GetDSm, UpdateDSm ,DeleteDSm ,GetsingleDSm}