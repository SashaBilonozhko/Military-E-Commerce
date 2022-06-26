const uuid = require('uuid')
const path = require('path')
const {ProductCategory} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController{
    async create(req, res){
        const {name} = req.body
        const {img} = req.files
        let filename = uuid.v4() + ".png"
        img.mv(path.resolve(__dirname, "..", "static", filename))
        const category = await ProductCategory.create({name: name, img: filename})
        return res.json(category)
    }

    async getAll(req, res){
        const categories = await ProductCategory.findAll()
        return res.json(categories)
    }

    async deleteOne(req, res){
        await ProductCategory.destroy({
            where:{id: req.params.id}
        }).then(() => res.send('success'))
    }

    async updateOne(req, res){
        await ProductCategory.update(
            {
                name: req.body.name
            }, 
            {
                where:{id: req.body.id}
            }
        ).then(() => res.send('success'))   
    }
}

module.exports = new CategoryController()