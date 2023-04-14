const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');
const verifyToken = require('../Token/jwt');

//Rutas Local
router.get('/getLocals', verifyToken, localController.listLocal);
router.get('/getLocal/:idLocal',verifyToken, localController.getLocal);
router.get('/getLocalByName/:nameLocal',verifyToken, localController.findLocalesByName);
//router.get('/getLocal/:idLocal', localController.selectLocal); //DUDAS SOBRE ESTE ELEMENTO

router.post('/addLocal', verifyToken, localController.addLocal);

router.delete('/deleteLocal/:id', verifyToken, localController.deleteLocal);

router.put('/updateLocal/:id', verifyToken, localController.updateLocal);

//Rutas Productos

router.get('/listProducts/:id/', verifyToken, localController.listProducto);
router.get('/getProductsByName/:id/:name', localController.findProductosByName);
router.get('/getProduct/:idLoc/:idPro', localController.obtenerProducto);

router.post('/addProduct/:id/', verifyToken, localController.addProducto);

router.put('/editProduct/:idLoc/:nomProd', verifyToken, localController.editProducto);

router.delete('/deleteProduct/:idLoc/:nomProd', verifyToken, localController.deleteProducto);



module.exports = router;
