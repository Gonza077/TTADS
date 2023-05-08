const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');

//------------------------------LOCALS------------------------------//
router.get('/', localController.getLocals);
router.get('/getLocal', localController.getLocal);
router.delete('/deleteLocal/:idLocal', localController.deleteLocal);
router.put('/updateLocal', localController.updateLocal);
router.post('/addLocal', localController.addLocal);
//------------------------------LOCALS------------------------------//


module.exports = router;
