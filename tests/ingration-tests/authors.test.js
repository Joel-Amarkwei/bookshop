const request = require('supertest')
let server;

describe('/api/authors', async () => {
    beforeEach(() => { server = require('../../index') })
    afterEach(() => { server.close() })

    describe('GET /', async () => {
        it('should return all authors', async () => {
            const res = await request(server).get('/api/authors')
            expect(res.status).toBe(200)
        })
    })
})
