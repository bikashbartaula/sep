'use strict';

module.exports = (sequelize, DataTypes) => {
    const User_Role = sequelize.define('User_Role', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },  
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    User_Role.associate = function(models) {
        models.User_Role.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            }
        });

        models.User_Role.belongsTo(models.Role, {
            foreignKey: {
                name: 'role_id',
                allowNull: false
            }
        })
    };

    return User_Role;
};