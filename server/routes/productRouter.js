const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', productController.create)
router.get('/getAll', productController.getAll)
router.get('/getOne/:id', productController.getOne)
router.delete('/deleteOne/:id', productController.deleteOne)
router.put('/updateOne/:id', productController.updateOne)
router.post('/order/:id', productController.Order)
router.get('/mostrated', productController.getMostRated)
router.get('/comment/getAll/:prodId', productController.getComments)
router.get('/reply/getAll/:prodId', productController.getReplies)
router.get('/mostrated', productController.getMostRated)
router.post('/rate/:id', productController.Rate)
router.post('/comment/:prodId', productController.createComment)
router.delete('/comment/delete/:commId', productController.deleteComment)
router.post('/reply/:prodId/:commId', productController.replyToComment)
router.delete('/reply/delete/:replyId', productController.deleteReply)

module.exports = router