const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');
const verifyToken = require('./usuario');
const jwt = require('jsonwebtoken');

//Rutas Local

router.get('/', verifyToken, localController.listLocal);
router.get('/:id/get-name', localController.nameLocal);
router.post('/add-local', verifyToken, localController.addLocal);
router.get('/:id', localController.selectLocal);
router.delete('/:id', verifyToken, localController.deleteLocal);
router.get('/:name/find-locales-name', localController.findLocalesByName);
router.put('/:id', verifyToken, localController.updateLocal);

//Rutas Productos

router.get('/:id/list-product', verifyToken, localController.listProducto);
router.post('/:id/add-product', verifyToken, localController.addProducto);
router.get('/:idLoc/get-product/:idPro', localController.obtenerProducto);
router.put('/:idLoc/edit-product/:nomProd', verifyToken, localController.editProducto);
router.delete('/:idLoc/delete-product/:nomProd', verifyToken, localController.deleteProducto);
router.get('/:id/find-productos-name/:name', localController.findProductosByName);



module.exports = router;
