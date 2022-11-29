const { DataTypes } = require('sequelize');

module.exports = {
    crypto
};

function crypto(sequelize)
{
    const attributes = {
        pair: { type: DataTypes.STRING, allowNull: false },
        rank: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    };

    const options = {
        timestamps: false
    };

    return sequelize.define('Crypto', attributes, options);
}