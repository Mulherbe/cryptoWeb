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
    const users =  await db.Users.findAll();
    console.log(users.every(user => user instanceof db.Users));
    //console.log("All users:", JSON.stringify(users, null, 2));
    return users;
}

async function getById(id)
{
    const user = await db.Users.findByPk(id);
    if (user === null) {
        console.log('Not found!');
    } else {
        console.log(user instanceof db.Users); // true
        console.log("The user's name is", user.username);
        
    }
    return user;
}

async function create(params)
{
    try{
    const user = new db.Users(params);
    
    // hash password
    user.password = await bcrypt.hash(params.password, 10);
    //mettre le role par defaut
    user.role = Role.User;

    // save user
    await user.save();
    
    
    }catch(err){
        console.log(err)
        
    }
}

async function update(id, params)
{
    const user =  await db.Users.findByPk(id);

    // validation
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } }))
    {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password si il a été changé
    if (params.password) {
        params.password = await bcrypt.hashSync(params.password);
    }

    // copie params dans user et sauvegarde
    Object.assign(user, params);
    await user.save();
    
}

async function _delete(id)
{
    const user = await getById(id);
    await user.destroy();
}
