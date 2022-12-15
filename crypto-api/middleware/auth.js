const jwt = require('jsonwebtoken');
const config = require("../helper/auth.config");
const db = require("../helper/db");
//const db = require("../helper/db");
//const Role = require('../helper/role');
/*
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

*/


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };
  
  isAdmin = (req, res, next) => {
    db.Users.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };
  
  isUser = (req, res, next) => {
    db.Users.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "User") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require User Role!"
        });
      });
    });
  };
  
isUserOrAdmin = (req, res, next) => {
    db.Users.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Admin") {
            next();
            return;
          }
          if(roles[i].name === "User") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require User or Admin Role!"
        });
      });
    });
  };async function authenticate(req, res, next)
  {
      authService.signin(req.body)
      .then(() => res.json({message: 'User authenticated'}))
      .catch(next);
  }
  
  
  const auth = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isUser: isUser,
    isUserOrAdmin: isUserOrAdmin
  };
  module.exports = auth;
