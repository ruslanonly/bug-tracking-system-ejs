import { RequestHandler } from "express";
import { UserRepository } from "../repositories/UserRepository";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

export class AuthController {
    private userRepository: UserRepository

    constructor(
        userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    register: RequestHandler = async (req, res) => {
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists) return res.status(400).send('Email address already exists');
    
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
        // Save user
        const user = User({
           email: req.body.email,
           name: req.body.name,
           password: hashedPassword
        });
    
        try {
            const newUser = await user.save()
            res.send({user: newUser._id});
        } catch (error) {
            res.send({message: error})
        }
    }
    
    login: RequestHandler = async (req, res) => {
        const registeredUser = await User.findOne({email: req.body.email});
        if(!registeredUser) return res.status(400).send('User with this email does not exist');
    
        // Check password
        const passwordMatch = bcrypt.compareSync(req.body.password, registeredUser.password);
        if(!passwordMatch) return res.status(400).send('Email or Password do not match');
    
        // Create and assign JWT
        const token = jwt.sign({_id: registeredUser._id}, process.env.JWT_SECRET);
        res.header('auth-token', token).send(token);
    }
}

