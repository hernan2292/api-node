const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const User = require('../models/user');

app.post('/login', function(req, res) {

    
    let body = req.body

    User.findOne( { email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password wrong.'
                }
            }); 
        }

        if ( !bcrypt.compareSync( body.password, userDB.password ) ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password wrong.'
                }
            }); 
        }

        let token = jwt.sign( {
            user: userDB
        },process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_LIFETIME } )

        res.json({
            ok: true,
            user: userDB,
            token: token
        });

    })

})

module.exports = app;
