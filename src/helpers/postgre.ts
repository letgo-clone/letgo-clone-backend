const { Pool } = require('pg');

const configData = require('../config/config');
const postgreConfig = configData.default.db;

const pool = new Pool({
    user: postgreConfig.username,
    database: postgreConfig.database,
    password: postgreConfig.password,
    port: postgreConfig.port,
    host: postgreConfig.host
}); 

module.exports = pool; 