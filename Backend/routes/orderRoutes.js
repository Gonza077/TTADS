const { Router } = require('express');
const router = Router();
const orderController = require('../controlers/orderController');

//-------------------------ORDERS-------------------------//
router.post('/add/:idUser', orderController.addOrder);
router.get('/orders/:idUser', orderController.getOrders);
router.get('/order/:idUser', orderController.getOrder);
router.put('/update/:idUser', orderController.updateOrder);
router.delete('/delete/:idUser', orderController.deleteOrder);

module.exports = router;