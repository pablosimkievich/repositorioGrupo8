module.exports = (sequelize, dataTypes) => {
    const Age = sequelize.define('Age', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recommended_age: {
            type: dataTypes.STRING
        },
        age_img: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'ages',
        timestamps: false
    });
    Age.associate = (models) => {
        Age.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'age_id'
        })
    }; 
    return Age;
}