const { Router } = require('express');
const router = Router();
const orderController = require('../controlers/orderController');

//-------------------------ORDERS-------------------------//
router.post('/addOrder/:idUser', orderController.addOrder);
router.get('/getOrders/:idUser', orderController.getOrders);
router.get('/getOrder/:idUser', orderController.getOrder);
router.put('/updateOrder/:idUser', orderController.updateOrder);
router.delete('/deleteOrder/:idUser', orderController.deleteOrder);

module.exports = router;