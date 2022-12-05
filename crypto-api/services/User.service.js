const bcrypt = require('bcryptjs');
const Role = require('../helper/role');
const db = require('../helper/db');

module.exports = {
    getAll,
    getById,
    create,
    login,
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
async function login(params)
{
    //vérifier que l'utilisateur existe
    const user = await db.Users.findOne({ where: { email: params.email } });
    try{
        if (user && bcrypt.compareSync(params.password, user.password))
        {
            // authentication successful
            const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
            return {
                ...user.toJSON(),
                token
            };
            console.log('token', token);
        }
    } catch (err)
        {
            console.log(err)

        }

}


async function update(id, params)
{
    const user = await db.Users.findByPk(id);

    // validation
    const usernameChanged = params.username && user.username !== params.username;
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
