const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/create', categoryController.create)
router.get('/getAll', categoryController.getAll)
router.delete('/delete/:id', checkRole('ADMIN'), categoryController.deleteOne)
router.put('/update', checkRole('ADMIN'), categoryController.updateOne)

module.exports = router