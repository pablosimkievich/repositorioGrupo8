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
    UserType.associate = (models) => {
        UserType.hasMany(models.User, {
            as: 'users',
            foreignKey: 'user_type_id'
        });
    }

    return UserType;
}