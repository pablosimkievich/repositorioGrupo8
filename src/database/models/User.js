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
        User.belongsToMany(models.Product, {
            as: 'products',
            through: 'orders',
            foreignKey: 'user_id',
            otherKey: 'product_id'
        });
        User.belongsTo(models.UserType, {
            as: 'users_type',
            foreignKey: 'user_type_id'
        });
        User.hasMany(models.Review, {
            as: 'reviews',
            foreignKey: 'user_fk_id',
        });
        
    }; 
    return User;
}