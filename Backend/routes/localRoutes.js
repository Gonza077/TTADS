const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');
const productController = require('../controlers/productController');

//router.get('/getLocals',verifyToken, localController.getLocals); EJEMPLO DE JWT INCORPORADO

//------------------------------LOCALS------------------------------//
router.get('/', localController.getLocals);
router.get('/getLocal', localController.getLocal);
router.delete('/deleteLocal/:idLocal', localController.deleteLocal);
router.put('/updateLocal', localController.updateLocal);
router.post('/addLocal', localController.addLocal);
//------------------------------LOCALS------------------------------//

//------------------------------PRODUCTOS------------------------------//
router.get('/getProducts/:idLocal', productController.getProducts);
router.get('/getProduct', productController.getProduct);
router.post('/addProduct/:idLocal', productController.addProduct);
router.delete('/deleteProduct', productController.deleteProduct);
router.put('/editProduct', productController.editProduct);


module.exports = router;
