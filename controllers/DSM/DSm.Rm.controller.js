const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user")
const addRm = async (req, res) => {

    try {
        var hashedPassword = await bcrypt.hash(req.body.password, Config.SALT_WORK_FACTOR)
        req.body.password = hashedPassword

        //req.body.userid = req.userData.uid
        req.body.dsmid = req.userData.uid
        req.body.smid = req.userData.uid

        // console.log(req.userData)

        req.body.usertype = "RM"

        let user = new User(req.body);
        user = await user.save();


        return res.status(200).json({ status: 200, message: "RM  created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}

const GetRM = async (req, res) => {
    try {


        const user = await User.find({ usertype: "RM", userid: req.userData.uid }).sort();
        return res.status(200).json({ status: 200, message: "Get All RM succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const UpdateRM = async (req, res) => {

    // console.log(req.body)
    const data = await User.findOne({ employeeid: req.body.employeeid, isdeleted: false, _id: { $ne: req.params.id } })
    if (data) {
        return res.status(500).json({ status: 400, message: "employeeid is Already" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!user) return res.status(500).send({ status: 500, message: "the RM  with given ID", data: user });

    return res.status(200).json({ status: 200, message: "RM updated successfully", data: user });
}

const DeleteRm = async (req, res) => {

    const data = await User.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const user = await User.findByIdAndRemove(req.params.id);

        if (!user) return res.status(500).json({ status: 500, message: "The RM is not present by id" })
        return res.status(200).json({ status: 200, message: "RM Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The RM is not present by id" });
    }

};
const GetRMdetails = async (req, res) => {
    // console.log(req.userData)
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The RM with the given ID", data: user });

        // res.send(user);
    }
    catch (ex) {
        console.log(ex.message);
        if (!User) return res.status(404).send('The RM with the given ID');

    }
};


module.exports = {
    addRm, GetRM, UpdateRM, DeleteRm, GetRMdetails

}