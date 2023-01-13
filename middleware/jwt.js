const secretkey = "secretkey"
const jwt = require("jsonwebtoken");
function checkAuth(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);
        if (typeof bearerHeader !== "undefined") {
            // console.log("12");
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            console.log(token)
            // req.token = token;
            jwt.verify(token, secretkey, (err, authData) => {
                if (err) {
                    // console.log(err)
                    return res.status(403).json({
                        message: "Invalid token"
                    })
                } else {
                    // console.log(authData)
                    req['userData'] = authData.user;

                    next();
                }

            });
        }
        else {
            return res.json({
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


exports.checkAuth = checkAuth