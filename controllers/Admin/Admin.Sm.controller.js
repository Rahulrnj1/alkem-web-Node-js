
const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user")

const addSm = async (req, res) => {
    console.log(req.userData)

    try {
        var hashedPassword = await bcrypt.hash(req.body.password, Config.SALT_WORK_FACTOR)
        req.body.password = hashedPassword

        //req.body.smid = req.userData.uid

        req.body.usertype = "Sm"

        let user = new User(req.body);
        user = await user.save();


        return res.status(200).json({ status: 200, message: "Sm created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}
const GetSm = async (req, res) => {
    try {
        // console.log(req.userData)
        const user = await User.find({ usertype: "Sm", userid: req.userData.uid }).sort();
        return res.status(200).json({ status: 200, message: "Get All Sm succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const UpdateSm = async (req, res) => {

    console.log(req.body)
    const data = await User.findOne({ employeeid: req.body.employeeid, isdeleted: false, _id: { $ne: req.params.id } })
    if (data) {
        return res.status(500).json({ status: 400, message: "employeeid is Already" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!user) return res.status(500).send({ status: 500, message: "the user with given ID", data: user });

    return res.status(200).json({ status: 200, message: "user updated successfully", data: user });
}
const DeleteSm = async (req, res) => {

    const data = await User.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const user = await User.findByIdAndRemove(req.params.id);

        if (!user) return res.status(500).json({ status: 500, message: "The SM is not present by id" })
        return res.status(200).json({ status: 200, message: "User Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The Sm is not present by id" });
    }

};
const GetsingleSm = async (req, res) => {
    // console.log("234")
    // console.log(req.userData)
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The Sm with the given ID", data: user });

        // res.send(user);
    }
    catch (ex) {
        console.log(ex.message);
        if (!User) return res.status(404).send('the SM with the given ID');

    }
};

module.exports = {
    addSm, GetSm, UpdateSm, DeleteSm, GetsingleSm
}