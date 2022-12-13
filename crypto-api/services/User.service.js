const bcrypt = require('bcryptjs');
const Role = require('../helper/role');
const db = require('../helper/db');
const jwt = require('jsonwebtoken');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    GetUserId
};



const message = {
    ATT_NOT_EXIST: 'Attribut not exist in body of request.',
}
const where = {
    ATT_NOT_EXIST: 'ClientController::create',
}

async function verifBodyOfCreate(body) {
    if (!('username' in body) || !('email' in body) || !('password' in body))
        throw {
            where: where.ATT_NOT_EXIST,
            message: message.ATT_NOT_EXIST
        }
}



async function GetUserId(authorization)
{
    // const token = authorization.split(' ')[1];
    // const decoded = jwt.verify(token, config.secret);
    // return decoded.sub;
}

async function getAll()
{
    const users = await db.Users.findAll();
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
        await Promise.all([
            verifBodyOfCreate(params),
        ])
        const user = new db.Users(params);
        // hash password
        user.password = bcrypt.hashSync(params.password, 10);
        //mettre le role par defaut
        user.role = Role.User;
        //mettre created_at et updated_at à la date actuelle
        user.created_at = Date.now();
        user.updated_at = Date.now();
        // save user
        console.log('user',user)
        await user.save();

    } catch (err)
    {
        console.log(err.message);
    }
}
async function update(id, params)
{
    const user = await db.Users.findByPk(id);

    // validation
    const usernameChanged = params.username && user.email !== params.email;
    if (usernameChanged && await db.User.findOne({ where: { email: params.email } }))
    {
        throw 'Email "' + params.email + '" is already taken';
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
