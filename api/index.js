const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const router = require('./router');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/widgets'
);

const app = express();
app.use(session({ secret: 'fixme secret', cookie: { maxAge: 60000 }}));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

module.exports = app;
