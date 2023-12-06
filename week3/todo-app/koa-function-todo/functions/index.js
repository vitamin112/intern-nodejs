const {onRequest} = require('firebase-functions/v2/https');
const app = require('./src/app');

exports.api = onRequest(app.callback());
