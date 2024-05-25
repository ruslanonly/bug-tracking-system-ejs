import express from 'express'

import { AuthRouter } from './auth/index'
import { IRouter } from '../../models/base'

export class ApiRouter implements IRouter {
    private authRouter: AuthRouter

    constructor(
        authRouter: AuthRouter
    ) {
        this.authRouter = authRouter
    }

    getRouter() {
        const routers = [
            this.authRouter.getRouter(),
        ]
        
        const router = express.Router()
        
        router.use('/v1', ...routers)

        return router
    };
}