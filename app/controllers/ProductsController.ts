import { RequestHandler } from "express";

import { ProductsRepository } from "../repositories/ProductsRepository";
import { QueryError, QuerySuccess } from "../models/query";

export class ProductsController {
    private productRepository: ProductsRepository;

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository;
    }

    getProduct: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const product = await this.productRepository.getProduct(parseInt(id));
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json(new QueryError(['Продукт не найден']));
            }
        } catch (error) {
            res.status(500).send(new QueryError([`Произошла ошибка сервера: ${error}`]));
        }
    };

    getProducts: RequestHandler = async (_req, res) => {
        try {
            const products = await this.productRepository.getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(new QueryError([`Произошла ошибка сервера: ${error}`]));
        }
    };

    addProduct: RequestHandler = async (req, res) => {
        const { name, description } = req.body;
        try {
            const productId = await this.productRepository.addProduct(name, description);
            res.status(201).json({ id: productId });
        } catch (error) {
            res.status(500).json(new QueryError([`Произошла ошибка сервера: ${error}`]));
        }
    };

    editProduct: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const success = await this.productRepository.editProduct(parseInt(id), name, description);
            if (success) {
                res.status(200).json(new QuerySuccess('Продукт успешно изменен'));
            } else {
                res.status(404).json(new QueryError(['Продукт не найден']));
            }
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json(new QueryError([`Произошла ошибка сервера: ${error}`]));
        }
    };

    deleteProduct: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const success = await this.productRepository.deleteProduct(parseInt(id));
            if (success) {
                res.status(200).json(new QuerySuccess('Продукт успешно удален'));
            } else {
                res.status(404).json(new QueryError(['Продукт не найден']));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json(new QueryError([`Произошла ошибка сервера: ${error}`]));
        }
    };
}
