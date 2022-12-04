
const CONN_STR = require("dotenv").config();
const Pool = require('pg').Pool;

const pool = new Pool(
    {
        user : "postgres",
        password: 'password',
        host : "host",
        database : "database",
        port : port,
    }
)


module.exports = pool;
