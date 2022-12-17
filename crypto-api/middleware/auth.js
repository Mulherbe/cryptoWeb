const jwt = require('jsonwebtoken');
const config = require("../helper/auth.config");
const db = require("../helper/db");
const Role = require('../helper/role');

//function qui get le role de l'utilisateur
verifyToken = (req, res, next) => {
  const token = req.body.token;
    if (!token) {
      return res.status(401).send({
        message: "No token provided!" 
      })
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
//verfication a faire des function et tester les routes avec le token   
isAdmin = (req, res, next) => {
    db.Users.findByPk(req.userId).then(user => {
      if(user.role === Role.Admin) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      }
    }
  );
};
  
  isUser = (req, res, next) => {
    db.Users.findByPk(req.userId).then(user => {
      if(user.role === Role.User) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require User Role!"
        });
        return;
      }
    }
  );
};
  
isUserOrAdmin = (req, res, next) => {
    db.Users.findByPk(req.userId).then(user => {
      if(user.role === Role.User || user.role === Role.Admin) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require User or Admin Role!"
        });
        return;
      }
    });
  };


  const auth = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isUser: isUser,
    isUserOrAdmin: isUserOrAdmin
  };
  module.exports = auth;
