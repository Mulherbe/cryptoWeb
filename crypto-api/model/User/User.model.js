const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclus le hash du mot de passe par défaut
            attributes: { exclude: ['password'] }
        },
        scopes: {
            // inclus le hash du mot de passe dans le scope 'withHash'
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}