import { Router } from "express";
import express from 'express'

import { IRouter } from "../../../models/base";
import { ProductsController } from "../../../controllers/ProductsController";

export class ProductsRouter implements IRouter {
    private productsController: ProductsController
    constructor(
        productsController: ProductsController
    ) {
        this.productsController = productsController
    }

    getRouter = (): Router => {
        const router = express.Router();

        router.get('/products', this.productsController.getProducts)
        router.get('/products/:id', this.productsController.getProduct)
        router.post('/products', this.productsController.addProduct)
        router.put('/products/:id', this.productsController.editProduct)
        router.delete('/products/:id', this.productsController.deleteProduct)

        return router
    }
}