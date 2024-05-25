import { Router } from "express";

import express from 'express'
import { AuthController } from "../../../controllers/AuthController";
import { IRouter } from "../../../models/base";

export class AuthRouter implements IRouter {
    private authController: AuthController
    constructor(
        authController: AuthController
    ) {
        this.authController = authController
    }

    getRouter = (): Router => {
        const router = express.Router();
        router.post('/login', this.authController.login)
        router.post('/register', this.authController.register)

        return router
    }
}