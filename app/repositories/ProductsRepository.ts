import mysql, { OkPacket, RowDataPacket } from 'mysql2/promise';

export class ProductsRepository {
    private connection: mysql.Connection;

    constructor(connection: mysql.Connection) {
        this.connection = connection;
    }

    async addProduct(name: string, description: string): Promise<number | null> {
        const query = 'INSERT INTO product (name, description) VALUES (?, ?)';
        const params = [name, description];
        try {
            const [result]: [OkPacket, any] = await this.connection.execute(query, params);
            return result.insertId;
        } catch (error) {
            console.error('Error executing addProduct query', error);
            throw error;
        }
    }

    async editProduct(id: number, name: string, description: string): Promise<boolean> {
        const query = 'UPDATE product SET name = ?, description = ? WHERE id = ?';
        const params = [name, description, id];
        try {
            const [result]: [OkPacket, any] = await this.connection.execute(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error executing editProduct query', error);
            throw error;
        }
    }

    async getProduct(id: number): Promise<RowDataPacket | null> {
        const query = 'SELECT * FROM product WHERE id = ?';
        const params = [id];
        try {
            const [rows]: [RowDataPacket[], any] = await this.connection.execute(query, params);
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (error) {
            console.error('Error executing getProduct query', error);
            throw error;
        }
    }

    async getProducts(): Promise<RowDataPacket[]> {
        const query = 'SELECT * FROM product';
        try {
            const [rows]: [RowDataPacket[], any] = await this.connection.execute(query);
            return rows;
        } catch (error) {
            console.error('Error executing getProducts query', error);
            throw error;
        }
    }

    async deleteProduct(id: number): Promise<boolean> {
        const query = 'DELETE FROM product WHERE id = ?';
        const params = [id];
        try {
            const [result] = await this.connection.execute<OkPacket>(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error executing deleteProduct query', error);
            throw error;
        }
    }
}
