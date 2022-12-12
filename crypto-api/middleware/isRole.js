const Role = require('../helper/role');
const auth = require('./auth');

//function qui permet de verifier si le role est admin ou user
function isRole(role=[]) {
    if(typeof role === 'string'){
        role = [role];
    }
    return [
        //authentification
        auth,
        //verifier si le role est admin ou user
        (req, res, next) => {
            if(role.includes(req.user.role == Role.Admin)){
                next();
            }else{
                res.status(401).json({message: "Unauthorized"});
            }
        }
    ];
}

module.exports = isRole;
