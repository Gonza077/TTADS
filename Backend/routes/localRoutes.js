const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');

//router.get('/getLocals',verifyToken, localController.getLocals); EJEMPLO DE JWT INCORPORADO

//------------------------------LOCALS------------------------------//
router.get('/', localController.getLocals);
router.get('/getLocal/:idLocal', localController.getLocal);
router.get('/getLocalByName/:nameLocal', localController.getLocalByName);
router.delete('/deleteLocal/:idLocal', localController.deleteLocal);
router.put('/updateLocal', localController.updateLocal);
router.post('/addLocal', localController.addLocal);
//------------------------------LOCALS------------------------------//

//------------------------------PRODUCTOS------------------------------//
router.get('/getProducts/:idLocal', localController.getProducts);
router.get('/getProduct/:idProduct', localController.getProduct);
router.get('/getProductByName/:nameProduct', localController.getProductByName);
router.post('/addProduct/:idLocal', localController.addProducto);

//------FALTA DESARROLLAR-----//
router.put('/editProduct/:idLoc/:nomProd', localController.editProducto);
router.delete('/deleteProduct/:idLoc/:nomProd', localController.deleteProducto);

module.exports = router;
