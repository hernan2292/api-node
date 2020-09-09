require('./application/config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes controllers config
app.use(require('./application/controllers/index'));

// Routes controllers config
app.use( express.static( path.resolve( __dirname , './public')));


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Data base connected $process.env.URLDB');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});