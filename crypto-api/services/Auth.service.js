const bcrypt = require('bcryptjs');
const config = require("../helper/auth.config")
const jwt = require('jsonwebtoken');
const db = require("../helper/db");
const Role = require("../helper/role");

module.exports = {
    authenticate,
    Logout
};


function authenticate (req, res) {

    try {
        db.Users.findOne({
                where: {
                    email: req.body.email
                }
        })
        .exec((err, user) => {
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
            var token = jwt.sign(
                { id: user.id }, config.secret, {
                expiresIn: 86400,
            });
            req.session.token = token;
            req.session.id = user.id;
            req.session.role = Role.User;

            console.log("Login succesfull");

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                role: req.session.role
            });
        });

    } catch (err) {
        console.log(err);
    }

};

function Logout(req, res){
    try {
        if (!req.session.id) {
            return res.status(403).send({ message: "you are not loggin, try to log in before log out" })
        }
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        console.log(err)
    }
};
