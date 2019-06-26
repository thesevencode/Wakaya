let db = {}

const database = process.env.DB_URL || "mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority"
const config = {
    user: process.env.DB_USER || 'juan',
    pass: process.env.DB_PASS || 'loper102'
}

db.database = database
db.config = config

module.exports = db