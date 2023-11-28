const { Pool } = require('pg');

const pool = new Pool({
    user: "firatyildiz",
    database: "letgo_clone",
    password: "",
    port: 5431,
    host: "127.0.0.1"
});

module.exports = pool; 