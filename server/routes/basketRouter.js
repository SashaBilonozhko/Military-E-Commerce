const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/getAll',  basketController.getAll)
router.get('/getOne/:id', basketController.getOne)

module.exports = router