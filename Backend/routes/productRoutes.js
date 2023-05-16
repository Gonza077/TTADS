const { Router } = require('express');
const router = Router();
const productController = require('../controlers/productController');

//------------------------------PRODUCTOS------------------------------//
router.get('/products/:idLocal', productController.getProducts);
router.get('/product/:idLocal', productController.getProduct);
router.post('/add/:idLocal', productController.addProduct);
router.delete('/delete/:idLocal', productController.deleteProduct);
router.put('/update/:idLocal', productController.editProduct);

module.exports = router;