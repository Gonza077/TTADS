const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');

router.get('/', usuarioController.getUsers);
router.post('/add', usuarioController.addUser);
router.get('/user/:idUser', usuarioController.getUser);
router.put('/update', usuarioController.updateUser);
router.delete('/delete/:idUser/', usuarioController.deleteUser);

module.exports = router;