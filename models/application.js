'use strict';

module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            default: sequelize.NOW,
        },
        date_submitted: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    Application.associate = function(models) {
        models.Application.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            }
        });

        models.Application.hasMany(models.Application_Answer, {
            foreignKey: {
                name: 'application_id',
                allowNull: false
            }
        })

        models.Application.belongsTo(models.Application_Status, {
            foreignKey: {
                name: 'status',
                allowNull: false
            }
        })
    };

    return Application;
};