const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');
const verifyToken = require('../Token/jwt');

//WORKING
router.get('/getLocals', verifyToken, localController.getLocals);
router.get('/getLocal/:idLocal',verifyToken, localController.getLocal);
router.get('/getLocal/:nameLocal',verifyToken, localController.findLocalesByName);
router.delete('/deleteLocal/:id', verifyToken, localController.deleteLocal);
router.put('/updateLocal', verifyToken, localController.updateLocal);


//------FALTA PROBAR-----//
router.post('/addLocal', verifyToken, localController.addLocal);


//------ELIMINAR-----//

router.get('/getProductsByName/:id/:name', localController.findProductosByName);
router.get('/getProduct/:idLoc/:idPro', localController.obtenerProducto);
router.post('/addProduct/:id/', verifyToken, localController.addProducto);
router.put('/editProduct/:idLoc/:nomProd', verifyToken, localController.editProducto);
router.delete('/deleteProduct/:idLoc/:nomProd', verifyToken, localController.deleteProducto);

module.exports = router;
