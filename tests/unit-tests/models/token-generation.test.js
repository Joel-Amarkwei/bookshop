//based on my code format, this property inside is probalbly the most suitable for unit testing.

const { User } = require('../../../models/users')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('config')

// this test just checks the efficiency of the token genetator function I created within the User's model
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




