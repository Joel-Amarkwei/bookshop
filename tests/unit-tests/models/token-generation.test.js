const { User } = require('../../../models/users')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('config')

describe('tokenGenerator', () => {
    it('should return a json web-token', async () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const user = new User(payload)
        const token = user.generateAuthToken()
        const decode = jwt.verify(token, config.get('privateToken'))
        expect(decode).toMatchObject(payload)
    })
})