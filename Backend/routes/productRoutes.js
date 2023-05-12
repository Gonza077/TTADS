const { Router } = require('express');
const router = Router();
const productController = require('../controlers/productController');

//------------------------------PRODUCTOS------------------------------//
router.get('/getProducts/:idLocal', productController.getProducts);
router.get('/getProduct/:idLocal', productController.getProduct);
router.post('/addProduct/:idLocal', productController.addProduct);
router.delete('/deleteProduct/:idLocal', productController.deleteProduct);
router.put('/editProduct', productController.editProduct);

module.exports = router;