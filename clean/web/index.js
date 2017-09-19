const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// Drivers
const authDriver = process.env.SUDO?
    require('../adapters/auth/sudo'):
    require('../adapters/auth/passwordless');

const api = require('./api')(authDriver);
const app = require('./app')(authDriver);

const combinedApp = express();
combinedApp.use(bodyParser.json());
combinedApp.use(bodyParser.urlencoded({ extended: false }));

combinedApp.use(express.static(__dirname + '/static'));
combinedApp.use('/api', api);
combinedApp.use('/app', app);

const server = http.createServer(combinedApp);
server.listen(process.env.PORT || 3000);
console.log('Server listening on port', process.env.PORT || 3000);
