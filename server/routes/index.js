const Router = require('express')
const router = new Router()
const basketRouter = require('./basketRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const productTypeRouter = require('./productTypeRouter')

router.use('/basket', basketRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/type', productTypeRouter)

module.exports = router