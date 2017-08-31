const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// Drivers
// TODO - const authDriver = require('../adapters/auth/passwordless');

//const auth = require('./auth')(authDriver);
//const api = require('./api');
const app = require('./app');

const combinedApp = express();
combinedApp.use(bodyParser.json());
combinedApp.use(bodyParser.urlencoded({ extended: false }));

combinedApp.use(express.static(__dirname + '/static'));
//combinedApp.use(auth);
//combinedApp.use('/api', api);
combinedApp.use('/app', app);

const server = http.createServer(combinedApp);
server.listen(process.env.PORT || 3000);
console.log('Server listening on port', process.env.PORT || 3000);
