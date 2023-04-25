const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');
const verifyToken= require('../Token/jwt');

//Rutas Usuario
router.get('/getUsers',verifyToken,usuarioController.getUsers);
router.get('/getUser/:idUser',verifyToken, usuarioController.getUser); //FALTA DESARROLLAR
router.post('/registerUser',verifyToken, usuarioController.addUser); //FALTA DESARROLLAR
router.post('/login',verifyToken, usuarioController.login);  //FALTA DESARROLLAR
router.put('/updateUser', usuarioController.updateUser);

// router.delete('/deleteUser/:idUser/', verifyToken, usuarioController.deleteUser);

//router.get('/getOrders/:idUser', verifyToken, usuarioController.listPedidos);

module.exports = router;