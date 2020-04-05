const request = require('supertest')
const mongoose = require('mongoose')
const _ = require('lodash')
const { Author, authorSchema } = require('../../models/authors')

let server;

describe('/api/authors', async () => {
    beforeEach(() => { server = require('../../index') })
    afterEach(  () => { server.close()
                           //  await Author.remove({})
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

        const res = await request(server).get('/:id')

        let results = await Author.findById('5e896c9f8a35e31f6223d307')
        
        expect(results.name).toBe('Ravimax')
        expect(results.phone).toBe('90909900')
    })
})