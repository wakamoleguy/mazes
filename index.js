const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./auth');
const api = require('./api');
const app = require('./app');

const combinedApp = express();
combinedApp.use(bodyParser.json());
combinedApp.use(bodyParser.urlencoded());
combinedApp.use(express.static(__dirname + '/public'));
combinedApp.use(auth);
combinedApp.use('/api', api);
combinedApp.use('/app', app);

const server = http.createServer(combinedApp);
server.listen(process.env.PORT || 3000);
console.log('Server listening on port', process.env.PORT || 3000);
