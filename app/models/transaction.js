module.exports = function(sequelize, DataTypes) {
 
    var Transaction = sequelize.define('transaction', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        amount: {
            type: DataTypes.DECIMAL
        },
        category: {
            type: DataTypes.ENUM('employee_contibution', 'employer_contribution', 'fee', 'dividend')
        }
 
    });

    //Account belongs to a User and cannot be created without a User
    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Account, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Transaction;
}