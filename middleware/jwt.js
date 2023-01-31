const secretkey = "secretkey"
const jwt = require("jsonwebtoken");
function checkAuth(usertype) {
    return function (req, res, next) {
        try {
            const bearerHeader = req.headers['authorization'];
            // console.log(bearerHeader);
            if (typeof bearerHeader !== "undefined") {
                // console.log("12");
                const bearer = bearerHeader.split(" ");
                const token = bearer[1];
                // console.log(token)
                // req.token = token;
                jwt.verify(token, secretkey, (err, authData) => {
                    if (err) {
                        // console.log(err)
                        return res.status(403).json({
                            message: "Invalid token"
                        })
                    } else {
                        if (usertype == authData.usertype) {
                            req['userData'] = authData;
                            //console.log(req)

                            next();

                        }
                        else {
                            return res.status(500).json({
                                message: "Token not found "
                            })
                        }
                    }

                });
            }
            else {
                return res.status(500).json({
                    message: "Token not found"
                })
            }
        }
        catch (e) {
            return res.status(403).json({
                message: "Invalid token"
            })
        }
    }
}


exports.checkAuth = checkAuth