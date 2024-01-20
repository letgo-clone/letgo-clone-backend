"use strict";
const multer = require('multer');
const storage = multer.memoryStorage();
const image_upload = multer({ storage });
const body_parse = multer();
module.exports = {
    body_parse,
    image_upload
};
