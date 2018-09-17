'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    Role.associate = function(models) {
        models.Role.hasMany(models.User_Role, {
            foreignKey: {
                name: 'role_id',
                allowNull: false,
            }
        });
    };

    return Role;
};