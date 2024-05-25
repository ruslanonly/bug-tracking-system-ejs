import { RequestHandler } from "express";

import { ProductsRepository } from "../repositories/ProductsRepository";

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
                res.status(404).send('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).send('Internal server error');
        }
    };

    getProducts: RequestHandler = async (_req, res) => {
        try {
            const products = await this.productRepository.getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal server error');
        }
    };

    addProduct: RequestHandler = async (req, res) => {
        const { name, description } = req.body;
        try {
            const productId = await this.productRepository.addProduct(name, description);
            res.status(201).json({ id: productId });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Internal server error');
        }
    };

    editProduct: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const success = await this.productRepository.editProduct(parseInt(id), name, description);
            if (success) {
                res.status(200).send('Product updated successfully');
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).send('Internal server error');
        }
    };

    deleteProduct: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const success = await this.productRepository.deleteProduct(parseInt(id));
            if (success) {
                res.status(200).send('Product deleted successfully');
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).send('Internal server error');
        }
    };
}
