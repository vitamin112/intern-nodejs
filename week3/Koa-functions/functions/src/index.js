const functions = require("firebase-functions");
const apiHandler = require("./handlers/api");

exports.helloWorld = functions.https.onRequest(apiHandler.callback());
