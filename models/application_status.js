'use strict';

module.exports = (sequelize, DataTypes) => {
    const Application_Status = sequelize.define('Application_Status', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
    Application_Status.associate = function(models) {
        models.Application_Status.hasMany(models.Application, {
            foreignKey: {
                name: 'status',
                allowNull: false,
            }
        });
    };

    return Application_Status;
};