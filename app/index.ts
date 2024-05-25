import { Express } from "express";

import { AuthController } from "./controllers/AuthController";
import { DatabaseManager } from "./db/db";
import { UsersRepository } from "./repositories/UsersRepository";
import { ApiRouter } from "./routes/v1";
import { AuthRouter } from "./routes/v1/auth";
import { WebRouter } from "./routes/web";

import { app as initialApp } from './app'

import config from './config'
import { ProductsRepository } from "./repositories/ProductsRepository";
import { ProductsController } from "./controllers/ProductsController";
import { ProductsRouter } from "./routes/v1/products";

async function configureApp(app: Express) {
    const db = new DatabaseManager(
        config.DATABASE.HOST,
		config.DATABASE.PORT,
		config.DATABASE.USER,
		config.DATABASE.PASSWORD,
		config.DATABASE.NAME
    )

    try {
        const connection = await db.createConnection()
        connection.connect()

        /* Repositories */
        const usersRepository = new UsersRepository(connection)
        const productsRepository = new ProductsRepository(connection)

        /* Controllers */
        const authController = new AuthController(usersRepository)
        const productsController = new ProductsController(productsRepository)

        /* Routers */
        const authRouter = new AuthRouter(authController)
        const productsRouter = new ProductsRouter(productsController)

        const apiRouter = new ApiRouter(
            authRouter,
            productsRouter
        )

        const webRouter = new WebRouter()

        app.use(apiRouter.getRouter())
        app.use(webRouter.getRouter())

        return app
    } catch (error) {
        console.log(error)

        return app
    }
}

async function startup() {
    try{
        const app = await configureApp(initialApp)

        app.listen(config.APPLICATION.PORT);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
}

process.on("SIGINT", async() => {
    console.log("Приложение завершило работу");
    process.exit();
});

startup()
