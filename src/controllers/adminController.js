const db = require('../database/models/index');


const orderList = async (req, res) => {
    try {
        const allTheOrders = db.Order.findAll();
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


module.exports = {
    orderList,
    orderDetail
}