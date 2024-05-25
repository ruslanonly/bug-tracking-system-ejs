import express, { RequestHandler } from 'express'
import { IRouter } from '../models/base';
import { AuthWebMiddleware } from '../middlewares/auth';

const PAGE = (pageName: string, parameters: object): RequestHandler => (req, res) => res.render(pageName, {
    ...parameters,
    // @ts-ignore
    user: req.user,
    params: req.params,
    query: req.query
})

export class WebRouter implements IRouter {
    getRouter() {
        const router = express.Router();
        
        router.get('/login', PAGE('pages/login', {
            meta: {
                title: 'Вход в систему'
            },
            layout_elements: {
                header_tabs: false
            }
        }));

        router.get('/register', PAGE('pages/register', {
            meta: {
                title: 'Регистрация в системе'
            },
            layout_elements: {
                header_tabs: false
            }
        }));

        router.get('/', AuthWebMiddleware, PAGE('pages/reports', {
            meta: {
                title: 'Отчеты'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/reports', AuthWebMiddleware, PAGE('pages/reports', {
            meta: {
                title: 'Отчеты'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/reports/:id', AuthWebMiddleware, PAGE('pages/report', {
            meta: {
                title: 'Отчет'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/reports/add', AuthWebMiddleware, PAGE('pages/add_report', {
            meta: {
                title: 'Добавление отчета'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/reports/:id/edit', AuthWebMiddleware, PAGE('pages/update_report', {
            meta: {
                title: 'Изменение отчета'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/products', AuthWebMiddleware, PAGE('pages/products', {
            meta: {
                title: 'Продукты'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/products/add', AuthWebMiddleware, PAGE('pages/add_product', {
            meta: {
                title: 'Добавление продукта'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/products/:id/edit', AuthWebMiddleware, PAGE('pages/update_product', {
            meta: {
                title: 'Изменение продукта'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/feedback', AuthWebMiddleware, PAGE('pages/feedback', {
            meta: {
                title: 'Обратная связь'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/401', PAGE('401', {
            meta: {
                title: 'Нет доступа'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        router.get('/*', PAGE('404', {
            meta: {
                title: 'Страница не найдена'
            },
            layout_elements: {
                header_tabs: true
            }
        }));

        return router
    }
}