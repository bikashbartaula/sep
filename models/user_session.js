'use strict';

module.exports = (sequelize, DataTypes) => {
    const User_Session = sequelize.define('User_Session', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_agent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        expired: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    User_Session.associate = function(models) {
        /** A session belongs to one user */
        models.User_Session.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            }
        });
    };

    return User_Session;
};