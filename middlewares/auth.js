const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next){
    const token = req.header('y-auth-header')
    if (!token) res.status(401).send('Access Denied, no token provided')

    try{
        const wrapper = jwt.verify(token, config.get('privateToken'))
        req.user = wrapper
        next()
    } catch(ex){
        res.status(400).send('Invalid token')
    }
}

module.exports = auth