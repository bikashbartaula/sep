'use strict';

module.exports = (sequelize, DataTypes) => {
    const Question_Type = sequelize.define('Question_Type', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    Question_Type.associate = function(models) {
        models.Question_Type.hasMany(models.Question, {
            foreignKey: {
                name: 'type_id',
                allowNull: false,
            }
        });
    };

    return Question_Type;
};