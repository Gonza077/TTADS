const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');
const verifyToken= require('../JWT/jwt');

//Rutas Usuario
router.get('/listUsers', usuarioController.listUsuario);
//router.get('/list-usuario', verifyToken, usuarioController.listUsuario);
router.get('/getUser/:id/', usuarioController.getUsuario);
router.post('/registerUser', usuarioController.addUsuario);
router.post('/login', usuarioController.signIn);

router.put('/updateUser/:id/', verifyToken, usuarioController.updateUsuario);
router.delete('/deleteUser/:id/', verifyToken, usuarioController.deleteUsuario);

//router.get('/list-pedidos', verifyToken, usuarioController.listPedidos);

module.exports = router;