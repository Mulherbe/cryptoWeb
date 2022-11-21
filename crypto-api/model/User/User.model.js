const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize)
{
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclus le hash du mot de passe par défaut
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // inclus le hash du mot de passe dans le scope 'withHash'
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}