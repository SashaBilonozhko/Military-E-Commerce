const uuid = require('uuid')
const path = require('path')
const {Basket, Product, BasketProduct} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

class BasketController{
    async getAll(req, res){
        const token = req.headers.authorization.split(' ')[1]
        let {productTypeId, limit, page} = req.query
        if(!token){
            return res.status(401).json({message:'Користувач не авторизований!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        let basket = await Basket.findOne({where:{userId:decoded.id}})
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit 
        let basketProducts
        if(!productTypeId){
            basketProducts = await BasketProduct.findAndCountAll(
                {where:{basketId:basket.id},
                include: [{model: Product, as: "product"}],
                limit, offset}
            )
        }
        else{
            basketProducts = await BasketProduct.findAll(
                {where:{basketId:basket.id},
                include: [{model: Product, as: "product", where: {productTypeId}}], 
                limit, offset}
            )
        }
        return res.json(basketProducts)
    }

    async getOne(req, res){
        const token = req.headers.authorization.split(' ')[1] 
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        let basket = await Basket.findOne({where:{userId:decoded.id}})
        const {id} = req.params
        const basketProduct = await BasketProduct.findOne(
            {
            where: {basketId:basket.id, productId:id},
            include: [{model: Product, as: "product"}]
            },
        )
        console.log(await basketProduct.getProduct().name)
        return res.json(basketProduct.product)
    }
}

module.exports = new BasketController()