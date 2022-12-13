const jwt = require('jsonwebtoken');
const config = require("../helper/auth.config");
const db = require("../helper/db");
const Role = require('../helper/role');

exports.isAuthenticated = (req, res, next) => {
    try {
        const token = req.session.token
        const decodedToken = jwt.verify(token, config.secret);
        const userId = decodedToken.id;
        if (req.session.id != userId) {
            return res.status(403).send({ message: "Error on id" })
        }
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};

exports.loginClient = (req, res, next) => {
    try {
        db.Users.findOne({
            email: req.body.email,
        })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (req.session.id != null) {
                    return res.status(403).send({ message: "you are already loggin, try to log out" })
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                next();
            });
    } catch (error) {
        res.status(401).json({ error });
    }
};


exports.RoleUser = (req, res, next) => {
    try {
        if (req.session.role !== Role.User) {
            return res.status(403).send({ message: "You are not Authorised to be here" })
        }
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};

exports.RoleAdmin = (req, res, next) => {
    try {
        if (req.session.role !== Role.Admin) {
            return res.status(403).send({ message: "You are not Authorised to be here" })
        }
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
