const http = require('http');
const express = require('express');

const router = require('./router');

const app = express();
router(app);

const server = http.createServer(app);
server.listen(process.env.PORT || 8000);
console.log('App server listening on', process.env.PORT || 8000);
