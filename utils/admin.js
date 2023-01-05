var admin = require("firebase-admin");
// const path = require("path");
// // console.log(__dirname)
// const dotenv = require('dotenv');
// dotenv.config({path: path.join(__dirname, '../.env')});
// // console.log((process.env))
const serviceAccount = require('../privatekey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
  databaseURL: "https://notifications-92f9a-default-rtdb.firebaseio.com"
});

const db = admin.database();
const messaging = admin.messaging();
module.exports = { admin, db,messaging };