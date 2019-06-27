const db = require('../../wakaya-db')

const config = require('../app/config')

const { error } = require('../../handlers')


let services = null

module.exports = async function initDatabase() {
    if (!services) {
        // debug('Connecting to database')
        try {
            services = await db(config.db.database, config.db.config)
        } catch (e) { error().handleFatalError(e) }
    }
    return services // Organization, User
}