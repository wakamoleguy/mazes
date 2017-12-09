const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// Drivers
const authDriver = global.process.env.TRUSTING?
    require('../adapters/auth/trusting'):
    require('../adapters/auth/passwordless');

const combinedApp = express();
combinedApp.use(authDriver.support());

const api = require('./api')(authDriver);
const app = require('./app')(authDriver);

combinedApp.use(bodyParser.json());
combinedApp.use(bodyParser.urlencoded({ extended: false }));

combinedApp.use(express.static(__dirname + '/static'));
combinedApp.use('/api', api);
combinedApp.use('/app', app);

const server = http.createServer(combinedApp);
server.listen(global.process.env.PORT || 3000);
console.log('Server listening on port', global.process.env.PORT || 3000);
