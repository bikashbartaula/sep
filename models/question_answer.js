'use strict';

module.exports = (sequelize, DataTypes) => {
    const Question_Answer = sequelize.define('Question_Answer', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    Question_Answer.associate = function(models) {
        models.Question_Answer.belongsTo(models.Question, {
            foreignKey: {
                name: 'question_id',
                allowNull: false,
            }
        });
    };

    return Question_Answer;
};