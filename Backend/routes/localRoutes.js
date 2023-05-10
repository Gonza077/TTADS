const { Router } = require('express');
const router = Router();
const localController = require('../controlers/localController');

//------------------------------LOCALS------------------------------//
router.get('/', localController.getLocals);
router.get('/local', localController.getLocal);
router.delete('/delete/:idLocal', localController.deleteLocal);
router.put('/update', localController.updateLocal);
router.post('/add', localController.addLocal);
//------------------------------LOCALS------------------------------//


module.exports = router;
