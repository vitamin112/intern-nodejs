const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: 'AIzaSyAVDYsWfBBfHhdkApvsBrY8SK6i4AmjQAg',
  authDomain: 'fire-store-155e0.firebaseapp.com',
  projectId: 'fire-store-155e0',
  storageBucket: 'fire-store-155e0.appspot.com',
  messagingSenderId: '883836123858',
  appId: '1:883836123858:web:8c20bbf885b5e79028cb0b',
};

module.exports = admin.initializeApp(firebaseConfig);
