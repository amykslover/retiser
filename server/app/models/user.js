module.exports = function(sequelize, DataTypes) {
 
    var User = sequelize.define('User', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
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
        password: {
            type: DataTypes.STRING
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