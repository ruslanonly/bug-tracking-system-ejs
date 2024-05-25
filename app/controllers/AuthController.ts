import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { UsersRepository } from "../repositories/UsersRepository";
import config from "../config";
import { COOKIE_NAME } from "../consts";

export class AuthController {
    private usersRepository: UsersRepository

    constructor(
        usersRepository: UsersRepository
    ) {
        this.usersRepository = usersRepository
    }

    register: RequestHandler = async (req, res) => {
        const emailExists = await this.usersRepository.findByEmail(req.body.email);
        if(emailExists) return res.status(400).send('Email address already exists');
    
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log(req.body.password, hashedPassword)
        try {
            const user = this.usersRepository.create(req.body.login, hashedPassword, req.body.email).catch((err) => console.log(err))
            res.status(201).send(user)
        } catch (error) {
            res.send({message: error})
        }
    }
    
    login: RequestHandler = async (req, res) => {
        const registeredUser = await this.usersRepository.findByEmail(req.body.email);
        if(!registeredUser) return res.status(400).send('User with this email does not exist');
    
        // Check password
        const passwordMatch = bcrypt.compareSync(req.body.password, registeredUser.password);
        if(!passwordMatch) return res.status(400).send('Email or Password do not match');
    
        const tokenPayload = {
            _id: registeredUser._id,
            login: registeredUser.login,
            email: registeredUser.email
        }
        const token = jwt.sign(tokenPayload, config.JWT.SECRET);
        res.cookie(COOKIE_NAME.AUTH_TOKEN, token).send();
    }
}

