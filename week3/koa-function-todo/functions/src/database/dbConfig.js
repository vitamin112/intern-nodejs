const admin = require('firebase-admin');
const key = require('./key.json');

module.exports = admin.initializeApp(admin.credential.cert(key));
