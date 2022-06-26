import {makeAutoObservable} from 'mobx'

export default class ProductStore{
    constructor() {
        this._productTypes = []
        this._categories = []
        this._products = []
        this._selectedType ={}
        this._selectedCategory ={}
        this._basketProducts = []
        this._comments = []
        this._replies = []
        this._page = 1
        this._totalCount = 8
        this._limit = 9
        makeAutoObservable(this)
    }

    setProductTypes(productTypes) {
        this._productTypes = productTypes
    }

    setCategories(categories) {
        this._categories = categories
    }

    setComments(comments) {
        this._comments = comments
    }

    setReplies(replies) {
        this._replies = replies
    }

    setProducts(products) {
        this._products = products
    }

    setBasketProducts(basketProducts) {
        this._basketProducts = basketProducts
    }

    setSelectedType(productType) {
        this.setPage(1)
        this._selectedType = productType
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count){
        this._totalCount = count
    }

    get productTypes() {
        return this._productTypes
    }

    get categories() {
        return this._categories
    }

    get products() {
        return this._products
    }

    get basketProducts() {
        return this._basketProducts
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get comments() {
        return this._comments
    }

    get replies() {
        return this._replies
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
}