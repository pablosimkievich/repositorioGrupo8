const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

<<<<<<< HEAD:src/routes/apiRouter/apiUserRouter.js
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.userDetail);
router.get('/orders', userController.getOrders)
=======
router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', userController.userDetail);
>>>>>>> 7e6f7154777e039bbbd7452f330405e09340e4a9:src/routes/api/apiUserRouter.js

module.exports = router;