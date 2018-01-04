module.exports = function(sequelize, DataTypes) {
 
    var Account = sequelize.define('Account', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        number: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        institution: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        type: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });

    //Account belongs to a User and cannot be created without a User
    Account.associate = function(models) {
        Account.hasMany(models.Transaction, {
            onDelete: "cascade"
        }),
        Account.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Account;
}