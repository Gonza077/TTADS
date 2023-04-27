const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');

//router.get('/getLocals',verifyToken, localController.getLocals);

//WORKING
router.get('/getLocals', localController.getLocals);
router.get('/getLocal/:idLocal', localController.getLocal);
router.get('/getLocal/:nameLocal', localController.findLocalesByName);
router.delete('/deleteLocal/:id', localController.deleteLocal);
router.put('/updateLocal', localController.updateLocal);
router.post('/addLocal', localController.addLocal);

router.get('/getProducts/:idLocal', localController.getProducts);
router.get('/getProduct/:nameProduct', localController.getProduct); //ESTE FUNCIONA PERO HAY QUE HACERLO CON EL ID DEL OBJETO


//------FALTA PROBAR-----//
router.get('/getProduct/:idLocal/:nameProduct', localController.getProduct);

//------ELIMINAR-----//

router.get('/getProductsByName/:id/:name', localController.findProductosByName);
router.get('/getProduct/:idLoc/:idPro', localController.obtenerProducto);
router.post('/addProduct/:id/', localController.addProducto);
router.put('/editProduct/:idLoc/:nomProd', localController.editProducto);
router.delete('/deleteProduct/:idLoc/:nomProd', localController.deleteProducto);

module.exports = router;
