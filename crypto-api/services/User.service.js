const bcrypt = require('bcryptjs');
const Role = require('../helper/role');
const db = require('../helper/db');
const jwt = require('jsonwebtoken');

module.exports = {
    getAll,
    getById,
    create,
    authenticate,
    update,
    delete: _delete,
    GetUserId
};

async function GetUserId(authorization)
{
    // const token = authorization.split(' ')[1];
    // const decoded = jwt.verify(token, config.secret);
    // return decoded.sub;
}

async function getAll()
{
    const users = await db.Users.findAll();
    console.log(users.every(user => user instanceof db.Users));
    //console.log("All users:", JSON.stringify(users, null, 2));
    return users;
}

async function getById(id)
{
    const user = await db.Users.findByPk(id);
    if (user === null)
    {
        console.log('Not found!');
    } else
    {
        console.log(user instanceof db.Users); // true
        console.log("The user's name is", user.username);

    }
    return user;
}

async function create(params)
{
    try
    {
        const user = new db.Users(params);

        // hash password
        user.password = bcrypt.hashSync(params.password, 10);
        //mettre le role par defaut
        user.role = Role.User;
        //mettre created_at et updated_at à la date actuelle
        user.created_at = Date.now();
        user.updated_at = Date.now();

        // save user
        await user.save();


    } catch (err)
    {
        console.log(err)

    }
}
async function authenticate (req, res, next) {
    db.Users.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

async function update(id, params)
{
    const user = await db.Users.findByPk(id);

    // validation
    const usernameChanged = params.email && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } }))
    {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password si il a été changé
    if (params.password)
    {
        params.password = bcrypt.hashSync(params.password);
    }
    //mettre updated_at à la date actuelle
    user.updated_at = Date.now();

    // copie params dans user et sauvegarde
    Object.assign(user, params);
    await user.save();
}

async function _delete(id)
{
    const user = await getById(id);
    await user.destroy();
}
