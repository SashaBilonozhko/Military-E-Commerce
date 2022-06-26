import {makeAutoObservable} from 'mobx'

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._role = ''
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setRole(string) {
        this._role = string
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get role() {
        return this._role
    }

    get user() {
        return this._user
    }
}