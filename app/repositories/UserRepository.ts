import mysql, { OkPacket } from 'mysql2/promise'

export class UserRepository {
    private connection: mysql.Connection

    constructor(
        connection: mysql.Connection
    ) {
        this.connection = connection
    }

    async create(login: string, password: string, email: string): Promise<number | null> {
        const query = 'INSERT INTO users (login, password, email) VALUES (?, ?, ?)';
        const params = [login, password, email];
        try {
            const [result] = await this.connection.query<OkPacket>(query, params);
            return result.insertId;
        } catch (error) {
            console.error('Error executing create query', error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<any | null> {
        const query = 'SELECT * FROM users WHERE email = ?';
        const params = [email];
        try {
            const [rows]: any = await this.connection.query(query, params);
            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (error) {
            console.error('Error executing findByEmail query', error);
            throw error;
        }
    }
}