const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');

router.post('/addUser', usuarioController.addUser); //FALTA DESARROLLAR
router.get('/getUsers', usuarioController.getUsers);
router.get('/getUser/:idUser', usuarioController.getUser); //FALTA DESARROLLAR
router.put('/updateUser', usuarioController.updateUser);
router.delete('/deleteUser/:idUser/', usuarioController.deleteUser);
//router.get('/getOrders/:idUser',, usuarioController.listPedidos);

module.exports = router;