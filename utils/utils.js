const DATABASE_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    waitForConnections: true,
    connectionLimit: process.env.POOL_SIZE
}

const QUERY_TYPE = {
    INSERT: "insert"
}

module.exports = {
    DATABASE_CONFIG, QUERY_TYPE
}