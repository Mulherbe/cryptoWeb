const bcrypt = require('bcryptjs');
const Role = require('helper/role');
const db = require('helper/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll()
{
    return await db.User.findAll();
}

async function getById(id)
{
    return await getUser(id);
}

async function create(params)
{
    // validation
    if (await db.User.findOne({ where: { email: params.email } }))
    {
        throw 'Email "' + params.email + '" is already registered';
    }
        const user = new db.User(params);
        // hash password
        user.passwordHash = await bcrypt.bcrypt(params.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();
        user.role = Role.User;
        // sauvegarde user dans la db
        await user.save();

}

async function update(id, params)
{
    const user = await getUser(id);

    // validation
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } }))
    {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password si il a été changé
    if (params.password) {
        params.passwordHash = await bcrypt.bcrypt(params.password);
    }

    // copie params dans user et sauvegarde
    Object.assign(user, params);
    await user.save();
}

async function _delete(id)
{
    const user = await getUser(id);
    await user.destroy();
}

// helper functions
async function getUser(id)
{
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}