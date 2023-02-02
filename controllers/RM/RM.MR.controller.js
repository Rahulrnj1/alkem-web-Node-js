const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user")
const addMR = async (req, res) => {

    try {
        var hashedPassword = await bcrypt.hash(req.body.password, Config.SALT_WORK_FACTOR)
        req.body.password = hashedPassword

        const userdetails = await User.findOne({ _id: req.userData.uid })

        // console.log(userdetails.smid)
        // console.log(userdetails.dsmid)
        // console.log(req.userData)
        req.body.dsmid = userdetails.dsmid
        req.body.smid = userdetails.smid
        // req.body.rmid = userdetails.
        req.body.rmid = req.userData.uid


        req.body.usertype = "MR"

        let user = new User(req.body);
        user = await user.save();


        return res.status(200).json({ status: 200, message: "MR created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
}
const GetMR = async (req, res) => {
    try {
        // console.log(req.userData)


        const user = await User.find({ usertype: "MR", rmid: req.userData.uid }).limit(30).sort();
        return res.status(200).json({ status: 200, message: "Get All MR succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};

const UpdateMR = async (req, res) => {

    // console.log(req.body)
    const data = await User.findOne({ employeeid: req.body.employeeid, isdeleted: false, _id: { $ne: req.params.id } })
    if (data) {
        return res.status(500).json({ status: 400, message: "employeeid is Already" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!user) return res.status(500).send({ status: 500, message: "the MR  with given ID", data: user });

    return res.status(200).json({ status: 200, message: "MR updated successfully", data: user });
}
const DeleteMr = async (req, res) => {

    const data = await User.findOne({ _id: req.params.id })
    //console.log(data)
    if (data) {
        const user = await User.findByIdAndRemove(req.params.id);

        if (!user) return res.status(500).json({ status: 500, message: "The MR is not present by id" })
        return res.status(200).json({ status: 200, message: "MR Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The MR is not present by id" });
    }

};
const GetMrdetails = async (req, res) => {
    // console.log(req.userData)
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The MR with the given ID", data: user });

        // res.send(user);
    }
    catch (ex) {
        console.log(ex.message);
        if (!User) return res.status(404).send('The MR with the given ID');

    }
};

module.exports = { addMR, GetMR, UpdateMR, DeleteMr, GetMrdetails }