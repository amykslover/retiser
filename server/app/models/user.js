module.exports = function(sequelize, DataTypes) {
 
    var User = sequelize.define('User', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        google_id: {
            type: DataTypes.STRING
        }, 
        facebook_id: {
            type: DataTypes.STRING
        },         
        password: {
            type: DataTypes.STRING
        },
        age: {
           type: DataTypes.INTEGER 
        },
        agi: {
           type: DataTypes.DECIMAL(10, 2)
        },
        last_login: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
    });

    User.associate = function(models) {
        User.hasMany(models.Account, {
            onDelete: "cascade"
        })
    }
 
    return User;

}