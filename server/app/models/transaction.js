module.exports = function(sequelize, DataTypes) {
 
    var Transaction = sequelize.define('Transaction', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE,
            notEmpty: true
        },
        month: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        year: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        description: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        category: {
            type: DataTypes.STRING
            // type: DataTypes.ENUM('employee_contibution', 'employer_contribution', 'fee', 'dividend')
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