const {ProductType} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductTypeController{
    async create(req, res){
        const {name, categoryId} = req.body
        const productType = await ProductType.create({name, categoryId})
        return res.json(productType)
    }

    async getAll(req, res){
        const productTypes = await ProductType.findAll()
        return res.json(productTypes)
    }

    async deleteOne(req, res){
        await ProductType.destroy({
            where:{id: req.params.id}
        }).then(() => res.send('success'))
    }

    async getTypesByCatId(req, res){
        const catId = req.params
        const productTypes = await ProductType.findAll({where:{categoryId:catId}})
        return res.json(productTypes)
    }

    async updateOne(req, res){
        await ProductType.update(
            {
                name: req.body.name,
                categoryId: req.body.categoryId
            }, 
            {
                where:{id: req.body.id}
            }
        ).then(() => res.send('success'))   
    }
}

module.exports = new ProductTypeController()