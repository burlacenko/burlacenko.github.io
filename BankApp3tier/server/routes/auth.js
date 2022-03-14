// import express from 'express';
const express = require('express');

// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

// import User from '../models/User.js';
const Account = require('../models/accounts.js');

// this will allow access to .env
require('dotenv').config();
const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH;
const refreshTokens = [];

const auth = express.Router();

auth.post('/login', (req, res) => {
    const { username, password } = req.body;

    Account.findOne({ username: username }, (err, user) => {
        if (err || !user) {
            res.status(401).json('user does not exist');
        } else {
            if (user.password === password) {
                const accessToken = jwt.sign({ username: user.username, job: user.job }, accessTokenSecret, { expiresIn: '120m' });
                const refreshToken = jwt.sign({ username: user.username, job: user.job }, refreshTokenSecret);

                refreshTokens.push(refreshToken);

                res.json({
                    accessToken,
                    refreshToken
                })
            } else {
                res.status(400).json('invalid credentials')
            }
        }
    })
})

auth.post('/signup', (req, res) => {
    const { username, password } = req.body;

    Account.findOne({ username: username }).then(user => {
        if (user) {
            res.status(500).json('user exists');
        } else {
            User.create({
                username: username,
                password: password
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send('error');
                } else {
                    console.log(result);
                    res.send('success')
                }
            })
        }
    })
})

// export default router;
module.exports = auth;