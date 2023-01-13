const express = require('express');
const Admin = require('../../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Config = require('../../comman/config')
const secretkey = "secretkey"
const adminRegister = async (req, res) => {

    let admin = await Admin.findOne({ email: req.body.email });
    var hashedPassword = await bcrypt.hash(req.body.password, Config.SALT_WORK_FACTOR)

    if (admin) return res.status(400).send('admin already registered');


    admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    await admin.save();
    return res.status(200).json({ data: { success: true, message: "Admin register Successfully", data: admin } });
    // res.send(admin);
};
const adminlogin = async (req, res) => {
    let admin = await Admin.findOne({ email: req.body.email });
    // console.log(admin)
    if (admin) {
        if (await bcrypt.compare(req.body.password, admin.password)) {
            jwt.sign({ admin }, secretkey, { expiresIn: '30d' }, (err, token) => {
                // console.log("inside admin");
                res.json({
                    token
                })
            })
        }
        else {
            return res.status(400).send('invalid PASSWORD  ');
        }


    }
    else {
        return res.status(400).send('invalid user  ');
    }
};

module.exports = { adminRegister, adminlogin }