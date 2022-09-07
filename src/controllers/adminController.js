const db = require('../database/models/index');


const orderList = async (req, res) => {
    try {
        const allTheOrders = await db.Order.findAll();
        res.send('order-list');

    } catch (error) {
        console.log(error);
    }
};

const orderDetail = async (req, res) => {
    try {
        const id = req.params.id
        const orderDetail = await db.Order.findByPk(id);
        res.send('order-detail');

    } catch (error) {
        console.log(error);
    }
};

const userList = async (req, res) => {
    try {
        const allUsers = await db.User.findAll({
            include: [
                {
                    association: 'users_type'
                }
            ]
        });

        res.render('admin/userList', {allUsers})
    } catch (error) {
        console.log(error);
    }
}

const productList = async (req, res) => {
    try {

        const allTheProducts = await db.Product.findAll({
            include: [
                {
                    association: 'category'
                },
                {
                    association: 'ages'
                },
                {
                    association: 'secondary_images'
                },
            ]
        })
        const secondary = await db.SecondaryImages.findAll();

        console.log(allTheProducts[1].secondary_images.image_2)
        res.render('admin/productos', {allTheProducts, secondary});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    orderList,
    orderDetail,
    userList,
    productList
}