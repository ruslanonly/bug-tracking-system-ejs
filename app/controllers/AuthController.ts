import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { UsersRepository } from "../repositories/UsersRepository";
import config from "../config";
import { COOKIE_NAME } from "../consts";
import { QueryError, QuerySuccess } from "../models/query";

export class AuthController {
    private usersRepository: UsersRepository

    constructor(
        usersRepository: UsersRepository
    ) {
        this.usersRepository = usersRepository
    }

    register: RequestHandler = async (req, res) => {
        const emailExists = await this.usersRepository.findByEmail(req.body.email);
        if(emailExists) return res.status(400).json(new QueryError(['Пользователь с такой почтой уже существует']));
    
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        try {
            const user = await this.usersRepository.create(req.body.login, hashedPassword, req.body.email).catch((err) => console.log(err))
            res.status(201).json(user)
        } catch (error) {
            res.json(new QueryError([`Произошла ошибка: ${error}`]))
        }
    }
    
    login: RequestHandler = async (req, res) => {
        const registeredUser = await this.usersRepository.findByEmail(req.body.email);
        if(!registeredUser) return res.status(400).json(
            new QueryError(['Пользователь с такой почтой не существует'])
        );
    
        const passwordMatch = bcrypt.compareSync(req.body.password, registeredUser.password);
        if(!passwordMatch) return res.status(400).json(
            new QueryError(['Почта или Пароль не подходят'])
        );
    
        const tokenPayload = {
            _id: registeredUser._id,
            login: registeredUser.login,
            email: registeredUser.email
        }
        const token = jwt.sign(tokenPayload, config.JWT.SECRET);
        res.cookie(COOKIE_NAME.AUTH_TOKEN, token).json(new QuerySuccess('Авторизация произошла успешно'));
    }
}

