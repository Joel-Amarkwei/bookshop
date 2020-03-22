const config = require('config')

module.exports = function() {
    if (!config.get('privateToken')) {
        throw new Error('FATAL ERROR: privateToken not defined')
    }
}
