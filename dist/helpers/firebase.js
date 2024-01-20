"use strict";
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-adminsdk.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "letgo-clone-3ddcb.appspot.com"
});
const bucket = admin.storage().bucket();
module.exports = {
    bucket
};
