const uuid = require('uuid')
const path = require('path')
const {Product, ProductType, User, ProductInfo, BasketProduct, ProductComment, ProductCommentReply, Basket, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')


class ProductController{
    async create(req, res, next){
        try{
        let {name, price, productTypeId, info} = req.body
        const {img} = req.files
        const prodType = await ProductType.findOne({where: {id: productTypeId}})
        let filename = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", filename))

        const product = await Product.create({name, price, productCategoryId:prodType.categoryId, productTypeId, img:filename})

        if(info){
            info = JSON.parse(info)
            info.forEach(i =>
                ProductInfo.create({
                    name: i.name,
                    desc: i.desc,
                    productId: product.id
                })
            )
        }

        return res.json({product})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {productTypeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit 
        let products
        if(!productTypeId || productTypeId === null){
            products = await Product.findAndCountAll({limit, offset}) 
        }
        else{
            products = await Product.findAndCountAll({where:{productTypeId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res){
        const {id} = req.params
        const product = await Product.findOne(
            {
            where: {id},
            include: [{model: ProductInfo, as: 'info'},
                    {model: ProductComment, as: 'comments'},
                    {model: ProductCommentReply, as: 'replies'}]
            },
        )
        return res.json(product)
    }

    async getMostRated(req, res){
        let products = await Product.findAll(
            {
            order: [
                sequelize.fn('max', sequelize.col('rating')),
            ],
            offset: 3
            },
        )
        return res.json(products).status(200).send(products);
    }

    async deleteOne(req, res){
        const {id} = req.params
        await BasketProduct.destroy({
            where:{productId:id},
        })
        await Product.destroy({
            where:{id},
            include: [{model: ProductInfo, as: 'info'},
                    {model: ProductComment, as: 'comments'},
                    {model: ProductCommentReply, as: 'replies'}]
        })
    }

    async updateOne(req, res, next){
        const {id} = req.params
        let prodInfo = req.body.info
        const product = await Product.findOne(
            {
            where: {id},
            include: [{model: ProductInfo, as: 'info'}]
            }
        )
        if(req.body.name){
            await product.update(
                {
                    name: req.body.name
                }
            ).then(next)
        }
        else{
            let newName = product.name
            await product.update(
                {
                    name: newName
                }
            ).then(next)
        }
        if(req.body.price){
            await product.update(
                {
                    price: req.body.price
                }
            ).then(next)
        }
        else{
            let newPrice = product.price
            await product.update(
                {
                    name: newPrice
                }
            ).then(next)
        }
        if(req.files){
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", filename))
            await product.update(
                {
                    img: filename
                }
            ).then(next)
        }
        else{
            let newImg = product.img
            await product.update(
                {
                    img: newImg
                }
            ).then(next)
        }
        if(req.body.productTypeId){
            await product.update(
                {
                    productTypeId: req.body.productTypeId
                }
            )
        }
        else{
            let newProdType = product.productTypeId
            await product.update(
                {
                    productTypeId: newProdType
                }
            ).then(next)
        }
        if(prodInfo){
            prodInfo = JSON.parse(prodInfo)
            prodInfo.forEach(i =>
                ProductInfo.create({
                    name: i.name,
                    desc: i.desc,
                    productId: product.id
                })
            )
            await product.update(
                {
                    info: prodInfo
                }
            )
        }
        // await product.update(
        //     {
        //         name: req.body.name,
        //         price: req.body.price,
        //         img: req.body.img,
        //         productTypeId: newType,
        //         info: prodInfo
        //     }
        // ).then(() => res.send('success'))
        return res
        .send('success')
        .json({product})
    }

    async Order(req, res){
        const prodId = req.params.id
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Користувач не авторизований!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const basket = await Basket.findOne({where:{userId: decoded.id}})
        const basketProduct = await BasketProduct.create({productId: prodId, basketId: basket.id, userId:decoded.id})
        let product = await Product.findOne({where:{id:prodId}})
        await basketProduct.setProduct(product)
        return res.json(basketProduct)
    }

    async createComment(req, res){
        const {prodId} = req.params
        let text = req.body.text
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Користувач не авторизований!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({where:{id:decoded.id}})
        const comment = await ProductComment.create({productId:prodId, text, nickname:user.nickname, userId:decoded.id})
        return res.json({comment})
    }

    async deleteComment(req, res){
        const {commId} = req.params
        await ProductComment.destroy({
            where:{id:commId},
            include: [{model: ProductCommentReply, as: 'replies'}]
        })
    }

    async deleteReply(req, res){
        const {replyId} = req.params
        await ProductCommentReply.destroy({
            where:{id:replyId},
        })
    }

    async getComments(req, res){
        const {prodId} = req.params
        const token = req.headers.authorization.split(' ')[1]
        const comments = await ProductComment.findAll({where:{productId:prodId}})
        return res.json({comments})
    }

    async replyToComment(req, res){
        let {prodId, commId} = req.params
        let text = req.body.text
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Користувач не авторизований!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({where:{id:decoded.id}})
        const reply = await ProductCommentReply.create({productId:prodId, productCommentId:commId, text, nickname:user.nickname, userId:decoded.id})
        return res.json({reply})
    } 
    
    async getReplies(req, res){
        const {prodId} = req.params
        const token = req.headers.authorization.split(' ')[1]
        const comments = await ProductCommentReply.findAll({where:{productId:prodId}})
        return res.json({comments})
    }

    async Rate(req, res){
        const prodId = req.params.id
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Користувач не авторизований!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const rateNumber = req.body.rate
        const rating = await Rating.create({userId: decoded.id, rate: rateNumber, productId: prodId})
        const rateSum = await Rating.sum('rate', {where:{productId: prodId}})
        const count = await Rating.count({where:{productId: prodId}})
        const product = await Product.findOne({where:{id: prodId}})
        let newRating = rateSum/count
        await product.update({rating: newRating})
        return res.json(product.rating)
    }
}

module.exports = new ProductController()