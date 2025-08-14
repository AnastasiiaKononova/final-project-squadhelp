const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const handlerError = require('./handlerError/handler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/api/v1', apiRouter);
app.use(handlerError);

module.exports = app;