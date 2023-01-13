const User = require("../../model/user");
const Headquarters = async (req, res) => {
    try {
        console.log(req.body)

        let user = new User(req.body);
        user = await user.save();


        return res.status(200).json({ status: 200, message: "Headquarters created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
};
const GetHeadquarters = async (req, res) => {
    try {

        const user = await User.find({}).sort();
        return res.status(200).json({ status: 200, message: "Get All user succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const UpdateHeadquarters = async (req, res) => {

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
const DeleteHeadquarters = async (req, res) => {

    const data = await User.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) return res.status(500).json({ status: 500, message: "The User is not present by id" })
        return res.status(200).json({ status: 200, message: "User Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The User is not present by id" });
    }

};
const Getheadquarters = async (req, res) => {
    // console.log("234")
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The user with the given ID", data: user });

        // res.send(user);
    }
    catch (ex) {
        console.log(ex.message);
        if (!User) return res.status(404).send('the user with the given ID');

    }
};


module.exports = {
    Headquarters, GetHeadquarters, UpdateHeadquarters, DeleteHeadquarters, Getheadquarters
}