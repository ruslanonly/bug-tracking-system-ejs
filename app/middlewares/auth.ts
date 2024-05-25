import { COOKIE_NAME } from "../consts"; 
import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import config from "../config";

const AuthMiddleware: RequestHandler = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME.AUTH_TOKEN];
    console.log(token)
    if(!token) return res.status(401)

    try {
        const verified = jwt.verify(token, config.JWT.SECRET)
        // @ts-ignore
        req.user = verified;
    } catch (error) {
        res.status(401)
    }

    next();
}

const AuthWebMiddleware: RequestHandler = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME.AUTH_TOKEN];
    console.log(token)
    if(!token) return res.status(401).redirect('/login')

    try {
        const verified = jwt.verify(token, config.JWT.SECRET)
        // @ts-ignore
        req.user = verified;
    } catch (error) {
        res.status(401).redirect('/401')
    }

    next();
}

export {
    AuthMiddleware,
    AuthWebMiddleware
}