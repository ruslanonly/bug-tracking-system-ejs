import express, { RequestHandler } from 'express'
import { IRouter } from '../models/base';

const StudentsPage: RequestHandler = async (req, res) => {
    res.render('pages/students', {
        meta: {
            title: 'Главная страница'
        }
    })
}

export class WebRouter implements IRouter {
    getRouter() {
        const router = express.Router();
        
        router.get('/', StudentsPage)
        router.get('/students', StudentsPage)
        
        router.get('/student/create', (req, res) => {
            res.render('pages/create-student', {
                meta: {
                    title: 'Добавление студента'
                },
            })
        })
        
        router.get('/student/:id/edit', (req, res) => {
            res.render('pages/edit-student', {
                meta: {
                    title: 'Изменение студента'
                },
                student_id: req.params.id
            })
        })
        router.get('/students/delete', (req, res) => {
            res.render('pages/delete-students', {
                meta: {
                    title: 'Удаление студентов'
                },
            })
        })
        router.get('/*', (req, res) => {
            res.render('404', {
                meta: {
                    title: 'Страница не найдена'
                },
            })
        })

        return router
    }
}