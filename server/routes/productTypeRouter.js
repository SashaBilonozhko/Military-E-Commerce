const Router = require('express')
const router = new Router()
const productTypeController = require('../controllers/productTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/create', productTypeController.create)
router.get('/getAll', productTypeController.getAll)
router.get('/getByCat/:catId', productTypeController.getTypesByCatId)
router.delete('/delete/:id', productTypeController.deleteOne)
router.put('/update', productTypeController.updateOne)

module.exports = router