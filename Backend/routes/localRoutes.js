const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');

//router.get('/getLocals',verifyToken, localController.getLocals); EJEMPLO DE JWT INCORPORADO

//------------------------------LOCALS------------------------------//
router.get('/', localController.getLocals);
router.get('/getLocal', localController.getLocal);
router.delete('/deleteLocal/:idLocal', localController.deleteLocal);
router.put('/updateLocal', localController.updateLocal);
router.post('/addLocal', localController.addLocal);
//------------------------------LOCALS------------------------------//

//------------------------------PRODUCTOS------------------------------//
router.get('/getProducts/:idLocal', localController.getProducts);
router.get('/getProduct', localController.getProduct);
router.post('/addProduct/:idLocal', localController.addProduct);
router.delete('/deleteProduct', localController.deleteProduct);
router.put('/editProduct', localController.editProduct);


module.exports = router;
