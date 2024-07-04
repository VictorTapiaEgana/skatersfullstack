const Pool = require('pg-pool');

const config = {
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
}

const pool = new Pool(config)

module.exports = pool;