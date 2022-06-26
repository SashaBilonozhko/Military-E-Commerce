const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const http = require('http')
const jwt = require('jsonwebtoken')
const {User, Basket, BasketProduct} = require('../models/models')
const checkRole = require('../middleware/checkRoleMiddleware')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '72h'}
    )
}

class UserController{
    async registration(req, res, next){
        const {nickname, email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Wrong email or password!'))
        }
        const candidate = await User.findOne({where: {nickname}})
        if(candidate){
            return next(ApiError.badRequest('Цей нікнейм уже існує!'))
        }
        if(candidate && candidate.email === email){
            return next(ApiError.badRequest('Цей еmail уже існує!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)     
        const user = await User.create({nickname, email, role, password: hashPassword})
        const token = jwt.sign({
            id: user.id, email, role
        },
        process.env.SECRET_KEY, {expiresIn: '72h'} 
        )  
        user.update(
            {
                token: token
            }
        )
        const basket = await Basket.create({userId: user.id})  
        return res
        .cookie("access_token", token, {
        httpOnly: false,
        })
        .status(200)
        .json({token})   
    }

    async login(req, res, next){
        const{email,password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Користувача не знайдено!'))
        }
        let comparePasswords = bcrypt.compareSync(password, user.password)
        if(!comparePasswords){
            return next(ApiError.internal('Вказано невірний пароль!'))
        }
        const token = user.token
        return res
        .cookie("access_token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({token}) 
    }

    async getUser(req, res){
        const token = req.cookies.access_token
        if(!token){
            return res.status(401).json({message:'Користувач не авторизований!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({where:{id: decoded.id}})
        return res.json({user}).status(200)
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()