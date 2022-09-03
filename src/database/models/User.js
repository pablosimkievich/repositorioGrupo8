module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type_id: {
            type: dataTypes.INTEGER
        },
        user_first_name: {
            type: dataTypes.STRING
        },
        user_last_name: {
            type: dataTypes.STRING
        },
        user_mail: {
            type: dataTypes.STRING
        },
        user_cel: {
            type: dataTypes.STRING
        },
        user_address: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        user_img: {
            type: dataTypes.STRING
        },
        dni: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'users',
        timestamps: false
    });
    User.associate = (models) => {
        User.belongsTo(models.UserType, {
            as: 'users_type',
            foreignKey: 'user_type_id'
        });
        User.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'user_id',
        });
        User.belongsToMany(models.Product, {
            as: 'products',
            through: 'order_detail',
            foreignKey: 'fk_user_id',
            otherKey: 'fk_product_id'
        })
    }; 
    return User;
}