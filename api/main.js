const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./router');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/widgets'
);

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
console.log('API server listening on', process.env.PORT || 3000);
