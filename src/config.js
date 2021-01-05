module.exports = {
    PORT: process.env.PORT || 5432,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/guthub-server',
}