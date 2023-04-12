const { Router } = require('express');
const router = Router();
const usuarioController = require('../controlers/userController');
const jwt = require('jsonwebtoken');
// const verifyToken= require('../JWT/jwt');
//Rutas Usuario

router.post('/registro-usuario', usuarioController.addUsuario);
router.post('/iniciar-sesion', usuarioController.signIn);
router.get('/list-usuario', verifyToken, usuarioController.listUsuario);
router.get('/:id/get-usuario', usuarioController.getUsuario);
router.delete('/:id/delete-usuario', verifyToken, usuarioController.deleteUsuario);
router.put('/:id/update-usuario', verifyToken, usuarioController.updateUsuario);
//router.get('/list-pedidos', verifyToken, usuarioController.listPedidos);


//Funcion para usar JSONWebTokens (usar en el router si se requiere logueo para realizar esa accion)

function verifyToken (req, res, next)  {
    if (!req.headers.authorization) {
        return res.status(401).send("Request no autorizada")
    };

    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send("Request no autorizada")
    };

    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;
    next();

}

module.exports = router,verifyToken;