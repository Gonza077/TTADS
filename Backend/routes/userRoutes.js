const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');

router.get('/', usuarioController.getUsers);
router.post('/addUser', usuarioController.addUser);
router.get('/getUser/:idUser', usuarioController.getUser);
router.put('/updateUser', usuarioController.updateUser);
router.delete('/deleteUser/:idUser/', usuarioController.deleteUser);
//-------------------------ORDERS-------------------------//
router.post('/addOrder/:idUser', usuarioController.addOrder);
router.get('/getOrders/:idUser', usuarioController.getOrders);
router.get('/getOrder/:idUser', usuarioController.getOrder);
router.put('/updateOrder/:idUser', usuarioController.updateOrder);
router.delete('/deleteOrder/:idUser', usuarioController.deleteOrder);

module.exports = router;