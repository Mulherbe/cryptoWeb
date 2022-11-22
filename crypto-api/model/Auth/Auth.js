const UserModel = require('model/User/User.model');

exports.loginUser = (req, res, next) => {
    try {
        UserModel.findOne({
            email: req.body.email,
        }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({ message: "Invalid Password!" });
                }
                req.session.id = user.id;
                req.session.role = "User"
                console.log("Login succesfull");
                res.status(200).send({
                    id: user._id,
                    userName: user.firstName,
                    email: user.email,
                    role: req.session.role
                });
    });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.Logout = async (req, res) => {
    try {
        if (!req.session.id) {
            return res.status(403).send({ message: "you are not loggin, try to log in before log out" })
        }
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};

