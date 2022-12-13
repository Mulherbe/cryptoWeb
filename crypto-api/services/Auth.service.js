const bcrypt = require('bcryptjs');
const config = require("../helper/auth.config")
const jwt = require('jsonwebtoken');
const db = require("../helper/db");

module.exports = {
    authenticate,
    Logout
};


async function authenticate (req, res, next) {

    try {
        db.Users.findOne({
            email: req.body.email,
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
            req.session.role = "Client";

            console.log("Login succesfull");

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                role: req.session.role
            });
        });
        next();

    } catch (err) {
        this.next(err);
    }

};

async function Logout(req, res){
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
