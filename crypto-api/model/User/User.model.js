const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = {
    users
};

function users(sequelize)
{
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true },
    };
    const options = {
        // disable default timestamp fields (createdAt and updatedAt)   
        timestamps: false,
    };
    


    return sequelize.define('Users', attributes, options);
}