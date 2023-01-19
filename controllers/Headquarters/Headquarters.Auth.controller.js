const bcrypt = require('bcryptjs');
const Config = require('../../comman/config')
const jwt = require('jsonwebtoken');
const secretkey = "secretkey"
const User = require("../../model/user");
const Headquarterslogin = async (req, res) => {

    let user = await User.findOne({ ememployeeid: req.body.ememployeeid });

    // console.log(user)
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // console.log(user)

            jwt.sign({ uid : user._id , usertype:'headquarters' }, secretkey, { expiresIn: '30d' }, (err, token) => {
                // console.log("inside user");
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
        return res.status(400).send('invalid headquarters  ');
    }
};

module.exports = {
    Headquarterslogin
   
}