let db = {}

const database = 'mongodb://localhost:27017/tragavo'
const config = {
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS || ''
}

db.database = database
db.config = config

module.exports = db