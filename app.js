const http = require('http');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('app'));

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on', port);
