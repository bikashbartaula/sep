'use strict';

module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    Question.associate = function(models) {
        models.Question.belongsTo(models.Question_Type, {
            foreignKey: {
                name: 'type_id',
                allowNull: false,
            }
        });

        models.Question.hasMany(models.Question_Answer, {
            foreignKey: {
                name: 'question_id',
                allowNull: false
            }
        })
    };

    return Question;
};