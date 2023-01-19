const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user");
const RMlogin = async (req, res) => {

    let user = await User.findOne({ employeeid: req.body.employeeid });

    // console.log(user)
    if (user) {
    
        if (await bcrypt.compare(req.body.password, user.password)) {
            // console.log(user)

            jwt.sign({ uid: user._id, usertype: "RM" }, secretkey, { expiresIn: '30d' }, (err, token) => {
                // console.log("inside m");
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
        return res.status(400).send('invalid RM  ');
    }
};

module.exports = {
    RMlogin

}