const secretkey = "secretkey"
const Doctor = require("../../model/Doctor")
const Getalldoctor = async (req, res) => {
    try {
        //console.log(doctor)

        const doctor = await Doctor.find({ smid: req.userData.uid }).sort();
        console.log(doctor)
        return res.status(200).json({ status: 200, message: "Get All doctor succesfully", data: doctor });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
module.exports = { Getalldoctor }