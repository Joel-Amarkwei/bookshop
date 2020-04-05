const request = require('supertest')
const mongoose = require('mongoose')
const _ = require('lodash')
const { Author } = require('../../models/authors')
const { User } = require('../../models/users')

let server;

describe('/api/authors', async () => {
    beforeEach(() => { server = require('../../index') })
    afterEach( async () => { server.close()
                        await Author.remove({})
                            })
    
    it('GET /', async () => {
        
        await Author.insertMany([
            { name: 'Ravimax', phone: '90909900'},
            { name: 'Nummax', phone: '887766778'},
            { name: 'Summax', phone: '112211212'}
        ])
        const res = await request(server).get('/api/authors')
        expect(res.status).toBe(200)
       // expect(res.body.length).toBe(3)
        expect(res.body.some((g) => g.name === 'Ravimax')).toBeTruthy()
        expect(res.body.some((a) => a.phone === '90909900')).toBeTruthy()
        
    })

    describe('/:id', () => {

    it('should return a 404 status if author is not found', async () => {
        await Author.findById('5e67f37baef3a907d5a0de27')

        const res = await request(server).get('/:id')
        
        expect(res.status).toBe(404)
    })

    it('should return an author with the given ID', async () => {
        // let author = new Author({ name: 'Ravimax', phone: '90909900'})
        // author = author.save()

        // const res = await request(server).get('/:id')

        // let results = await Author.findById(author._id)
        
        // expect(results.name).toBe('Ravimax')
        // expect(results.phone).toBe('90909900')
    })
  })

  describe('POST /', () => {
    it('should return a 401 if client is not logged in', async () => {
        const res = await request(server)
        .post('/api/authors')
        .send({ name: 'Sussex', phone: '2938485843'})

        expect(res.status).toBe(401)
    })
    
    it('should return a validation error if the specified validation context failed', async () => {
        const token = User().generateAuthToken()
        
        const res = await request(server)
        .post('/api/authors')
        .set('y-auth-header', token)
        .send({ name: 'Sussex'})
        
        expect(res.status).toBe(400)
    })

    it('save the author if it is valid', async () => {
        const token = User().generateAuthToken()
        
        const res = await request(server)
        .post('/api/authors')
        .set('y-auth-header', token)
        .send({ name: 'Sussex', phone: '55955843'})

        expect(res.status).toBe(200)
    })

    it('save the author if it is valid', async () => {
        const token = User().generateAuthToken()
        
        const res = await request(server)
        .post('/api/authors')
        .set('y-auth-header', token)
        .send({ name: 'Sussex', phone: '55955843'})
        
        expect(res.body).toHaveProperty('_id')
        expect(res.body).toHaveProperty('name', 'Sussex')
    })
  })
})




