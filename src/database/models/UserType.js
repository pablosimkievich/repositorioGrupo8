module.exports = (sequelize, dataTypes) => {
    const UserType = sequelize.define('UserType', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type_name: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'users_type',
        timestamps: false
    });
    /* User.associate = (models) => {
        User.belongsTo(models.Orders, {
            as: 'products',
            through: 'orders',
            foreignKey: 'product_id',
            otherKey: ''
        })
    }; */
    return UserType;
}