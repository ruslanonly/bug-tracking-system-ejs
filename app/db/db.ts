import { Connection } from 'mysql2'
import mysql from 'mysql2/promise'

export class DatabaseManager {
	private host: string;
	private port: number;
	private user: string;
	private password: string;
	private database_name: string;

	constructor(
		host: string,
		port: number,
		user: string,
		password: string,
		database_name: string
	) {
		this.host = host
		this.port = port
		this.user = user
		this.password = password
		this.database_name = database_name
	}

	async createConnection() {
		const connection = await mysql.createConnection({
			host: this.host,
			port: this.port,
			user: this.user,
			password: this.password,
			database: this.database_name
		});

		return connection
	}
}
