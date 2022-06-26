import ProductPage from './pages/ProductPage'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import { ADMIN_ROUTE, AUTH_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE} from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]