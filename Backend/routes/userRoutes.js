const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');
const orderController = require('../controlers/orderController');

router.get('/', usuarioController.getUsers);
router.post('/addUser', usuarioController.addUser);
router.get('/getUser/:idUser', usuarioController.getUser);
router.put('/updateUser', usuarioController.updateUser);
router.delete('/deleteUser/:idUser/', usuarioController.deleteUser);
//-------------------------ORDERS-------------------------//
router.post('/addOrder/:idUser', orderController.addOrder);
router.get('/getOrders/:idUser', orderController.getOrders);
router.get('/getOrder/:idUser', orderController.getOrder);
router.put('/updateOrder/:idUser', orderController.updateOrder);
router.delete('/deleteOrder/:idUser', orderController.deleteOrder);

module.exports = router;