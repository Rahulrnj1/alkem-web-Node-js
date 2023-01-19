const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user");
const Smlogin = async (req, res) => {

    let user = await User.findOne({ employeeid: req.body.employeeid });

    console.log(user)
    if (user) {
    
        if (await bcrypt.compare(req.body.password, user.password)) {
            // console.log(user)

            jwt.sign({ uid: user._id, usertype: "Sm" }, secretkey, { expiresIn: '30d' }, (err, token) => {
                // console.log("inside Sm");
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
        return res.status(400).send('invalid Sm  ');
    }
};

module.exports = {
    Smlogin

}