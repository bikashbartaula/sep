'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Override the current toJSON to remove password */
    User.prototype.toJSON = function() {
        const values = Object.assign({}, this.get());

        delete values.password;
        return values;
    }

    /** Compare the password */
    User.prototype.validatePassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

    /** Association */
    User.associate = function(models) {
        /** A user has many sessions */
        models.User.hasMany(models.User_Session, {
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            }
        });

        models.User.hasOne(models.User_Role, {
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            }
        });
    };

    return User;
};