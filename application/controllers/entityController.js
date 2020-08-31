const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Model = require('../models/entity');

const app = express();

app.get('/entity', function(req, res) {

    let start = req.query.start || 0;
    start = Number(start);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    Model.find({ estado: true }, 'nombre email role estado google img')
        .skip(start)
        .limit(limit)
        .exec((err, model) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            model.count({ state: true }, (err, count) => {

                res.json({
                    ok: true,
                    model,
                    count: count
                });

            });


        });

});

app.post('/entity', function(req, res) {

    let body = req.body;

    let model = new Model({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    model.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });

    });


});

app.put('/entity/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    Model.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });

    })

});

app.delete('/entity/:id', function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let changeState = {
        estado: false
    };

    Model.findByIdAndUpdate(id, changeState, { new: true }, (err, userDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not find'
                }
            });
        }

        res.json({
            ok: true,
            usuario: userDeleted
        });

    });

});

module.exports = app;

