var { expressjwt: jwt } = require("express-jwt");
const { secret } = require('../config.json');

authorizeUser = (role=[]) => {
    //vérifier si le role est un tableau ou non et le convertir en tableau si ce n'est pas le cas 
    if (typeof role === 'string') {
        role = [role];
    }
    //vérifier le role de l'utilisateur et son token
    return [
        //vérifier le token
        jwt({ secret, algorithms: ['HS256'] }),
        //vérifier le role
        (req, res, next) => {
            if (role.length && !role.includes(req.user.role)) {
                // l'utilisateur n'a pas le bon role
                return res.status(401).json(
                    { 
                        message: 'Unauthorized' 
                    }
                );
            }
            // l'utilisateur a le bon role
            next();
        }
    ];
}

module.exports = authorizeUser;



