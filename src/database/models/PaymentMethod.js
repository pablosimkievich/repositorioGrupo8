module.exports = (sequelize, dataTypes) => {
    const PaymentMethod = sequelize.define('PaymentMethod', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pay_method_type: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'payment_method',
        timestamps: false
    });
    PaymentMethod.associate = (models) => {
        PaymentMethod.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'pay_method_id'
        })
    }; 

    return PaymentMethod;
}