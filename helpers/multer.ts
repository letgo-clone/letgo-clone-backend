const multer = require('multer');

const storage = multer.memoryStorage();

const body_parse = multer();

module.exports = {
    body_parse
}