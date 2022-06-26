const sequelize = require('../db')
const {DataTypes, DATE} = require('sequelize')
const { Sequelize } = require('../db')

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	nickname: {type: DataTypes.STRING, unique: true, allowNull: false},
	email: {type: DataTypes.STRING, unique: true},
	password: {type: DataTypes.STRING, allowNull: false},
	token: {type: DataTypes.STRING, allowNull: true},
	role: {type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	userId: {type: DataTypes.INTEGER, allowNull: false},
})

const BasketProduct = sequelize.define('basket_product', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	productId: {type: DataTypes.INTEGER, allowNull: false},
	basketId: {type: DataTypes.INTEGER, allowNull: false},
	userId: {type: DataTypes.INTEGER, allowNull: false},
	address: {type: DataTypes.STRING},
	commentary: {type: DataTypes.STRING},
})

const Product = sequelize.define('product', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false},
	rating: {type: DataTypes.FLOAT, defaultValue: 0},
	img: {type: DataTypes.STRING, allowNull: false},
	productTypeId: {type: DataTypes.INTEGER},
	categoryId: {type: DataTypes.INTEGER}
})

const Rating = sequelize.define('rating', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	productId: {type: DataTypes.INTEGER, allowNull: false},
	userId: {type: DataTypes.INTEGER, allowNull: false},
	rate: {type: DataTypes.INTEGER, allowNull: false}
})

const ProductType = sequelize.define('product_type', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	categoryId: {type: DataTypes.INTEGER, allowNull: false},
	name: {type: DataTypes.STRING, allowNull: false}
})

const ProductCategory = sequelize.define('product_category', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	img: {type: DataTypes.STRING, allowNull: false},
	name: {type: DataTypes.STRING, allowNull: false}
})

const ProductInfo = sequelize.define('product_info', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	productId: {type: DataTypes.INTEGER, allowNull: false},
	name: {type: DataTypes.STRING, allowNull: false},
	desc: {type: DataTypes.STRING, allowNull: false}
})

const ProductComment = sequelize.define('product_comment', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	productId: {type: DataTypes.INTEGER},
	nickname: {type: DataTypes.STRING, allowNull: false},
	text: {type: DataTypes.STRING, allowNull: false},
	userId: {type: DataTypes.INTEGER}
})

const ProductCommentReply = sequelize.define('product_comment_reply', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	productId: {type: DataTypes.INTEGER},
	productCommentId: {type: DataTypes.INTEGER},
	nickname: {type: DataTypes.STRING, allowNull: false},
	text: {type: DataTypes.STRING, allowNull: false},
	userId: {type: DataTypes.INTEGER}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

BasketProduct.hasOne(Product)

ProductType.hasMany(Product)
Product.belongsTo(ProductType)

ProductCategory.hasMany(ProductType)
ProductType.belongsTo(ProductCategory)

ProductCategory.hasMany(Product)
Product.belongsTo(ProductCategory)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Product.hasMany(Rating)
Rating.belongsTo(Product)

User.hasMany(Rating)
Rating.belongsTo(User)

Product.hasMany(ProductComment, {as: 'comments'})
ProductComment.belongsTo(Product)

ProductComment.hasMany(ProductCommentReply)
ProductCommentReply.belongsTo(ProductComment)

Product.hasMany(ProductCommentReply, {as: 'replies'})
ProductCommentReply.belongsTo(Product)

User.hasMany(ProductComment)
ProductComment.belongsTo(User)

User.hasMany(ProductCommentReply)
ProductCommentReply.belongsTo(User)

module.exports ={
	User,
	Basket,
	BasketProduct,
	Product,
	ProductComment,
	ProductCommentReply,
	ProductInfo,
	Rating,
	ProductType,
	ProductCategory
}

