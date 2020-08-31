const express = require('express');
const app = express();

app.use(require('./entityController'));
app.use(require('./userController'));
app.use(require('./loginController'));

module.exports = app;
