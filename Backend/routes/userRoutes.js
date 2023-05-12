const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');

router.get('/', usuarioController.getUsers);
router.post('/addUser', usuarioController.addUser);
router.get('/getUser/:idUser', usuarioController.getUser);
router.put('/updateUser', usuarioController.updateUser);
router.delete('/deleteUser/:idUser/', usuarioController.deleteUser);

module.exports = router;