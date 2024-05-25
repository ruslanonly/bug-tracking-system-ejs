import express from 'express'

import { AuthRouter } from './auth/index'
import { IRouter } from '../../models/base'
import { ProductsRouter } from './products'

export class ApiRouter implements IRouter {
    private authRouter: AuthRouter
    private productsRouter: ProductsRouter

    constructor(
        authRouter: AuthRouter,
        productsRouter: ProductsRouter
    ) {
        this.authRouter = authRouter;
        this.productsRouter = productsRouter;
    }

    getRouter() {
        const routers = [
            this.authRouter.getRouter(),
            this.productsRouter.getRouter()
        ]
        
        const router = express.Router()
        
        router.use('/v1', ...routers)

        return router
    };
}