import {$authHost, $host} from "./index";

export const createType = async(type) => {
    const {data} = await $authHost.post('api/type/create', type)
    return data
}

export const fetchTypes = async() => {
    const {data} = await $host.get('api/type/getAll')
    return data
}

export const fetchCategories = async() => {
    const {data} = await $host.get('api/category/getAll')
    return data
}

export const deleteType = async(id) => {
    const {data} = await $authHost.delete('api/type/delete/' + id)
    return data
}

export const updateType = async(type) => {
    const {data} = await $authHost.put('api/type/update', type)
    return data
}

export const createProduct = async(product) => {
    const {data} = await $authHost.post('api/product/create', product)
    return data
}

export const addRate = async(id, rate) => {
    const {data} = await $authHost.post('api/product/rate/' + id, rate)
    return data
}

export const fetchProducts = async(productTypeId, page, limit=10) => {
    const {data} = await $host.get('api/product/getAll', {params: {productTypeId, page, limit}})
    return data
}

export const fetchBasketProducts = async(productTypeId, page, limit=10) => {
    const {data} = await $authHost.get('api/basket/getAll', {params: {productTypeId, page, limit}})
    return data
}

export const fetchOneProduct = async(id) => {
    const {data} = await $authHost.get('api/product/getOne/' + id)
    return data
}

export const deleteProduct = async(id) => {
    const {data} = await $authHost.delete('api/product/deleteOne/' + id)
    return data
}

export const updateProduct = async(id, product) => {
    const {data} = await $authHost.put('api/product/updateOne/' + id, product)
    return data
}

export const addToCart = async(id) => {
    const {data} = await $authHost.post('api/product/order/' + id)
    return data
}

export const comment = async(id, comment) => {
    const {data} = await $authHost.post('api/product/comment/' + id, comment)
    return data
}

export const getComments = async(id) => {
    const {data} = await $authHost.get('api/product/comment/getAll/' + id)
    return data
}

export const deleteComment = async(id) => {
    const {data} = await $authHost.delete('api/product/comment/delete/' + id)
    return data
}

export const fetchCatTypes = async(catId) => {
    const {data} = await $host.post('api/type/getByCat/' + catId)
    return data
}

export const reply = async(prodId, commId, reply) => {
    const {data} = await $authHost.post('api/product/reply/' + prodId + '/' + commId, reply)
    return data
}

export const getReplies = async(prodId) => {
    const {data} = await $authHost.get('api/product/reply/getAll/' + prodId)
    return data
}

export const deleteReply = async(id) => {
    const {data} = await $authHost.delete('api/product/reply/delete/' + id)
    return data
}