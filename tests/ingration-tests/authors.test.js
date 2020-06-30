
const request = require('supertest')
const _ = require('lodash')
const { Author } = require('../../models/authors')
const { User } = require('../../models/users')

// creating a server
let server = require('../../index');


//describing some properties of the /api/authors api endpoint
 describe('/api/authors',  () => {
    jest.setTimeout(150000);
    // before each importation the server is activated to handle each request individually.
    beforeEach(() => { server = require('../../index') })
    
  // after each importation the server is deactivated to make sure that it runs every request just once.
    afterEach( async () => { server.close()
                             await Author.remove({})
                            })
                        
    test('GET /', async () => {
        jest.setTimeout(100000)
        //inserting a number of properties into the Author's field
        await Author.insertMany([
            { name: 'Ravimax', phone: '90909900'},
            { name: 'Nummax', phone: '887766778'},
            { name: 'Summax', phone: '112211212'}
        ])
        //this test checks if the response status is fine
        const res = await request(server).get('/api/authors')
        expect(res.status).toBe(200)
        //expect(res.body.length).toBe(3) // -> this one was just to check the the length of the content of the response
        
        //these two last tests if a particular property is present in the any of the field amongst the Authors database.
        expect(res.body.some((g) => g.name === 'Ravimax')).toBeTruthy()
        expect(res.body.some((a) => a.phone === '90909900')).toBeTruthy()
        
    })

    describe('/:id', () => {
        jest.setTimeout(100000)
    //yeah so as the name suggests this one is basically testing for
    test('should return a 404 status if author is not found', async () => {
        await Author.findById('5efab1df9f2206e588bf1f2d')
        const res = await request(server).get('/:id')
        expect(res.status).toBe(404)
    })
    })
    
    // yeah so this one follows similarly as the previous ones ie making a User's request
    describe('POST /', () => {
    jest.setTimeout(100000);
    test('should return a 401 if client is not logged in', async () => {
        const res = await request(server)
        .post('/api/authors')
        .send({ name: 'Sussex', phone: '2938485843'})

        expect(res.status).toBe(401)
    })
    })

      //here with the help of json web token I encoded some properties and and made headings out of it, this test
      //this plays around that idea.
    it('should return a validation error if the specified validation context failed', async () => {
        jest.setTimeout(100000);
        const token = User().generateAuthToken()
        
        const res = await request(server)
        .post('/api/authors')
        .set('y-auth-header', token)
        .send({ name: 'Sussex'})
        
        expect(res.status).toBe(400)
    })

    it('save the author if it is valid', async () => {
        jest.setTimeout(100000)
        const token = User().generateAuthToken()
        
        const res = await request(server)
        .post('/api/authors')
        .set('y-auth-header', token)
        .send({ name: 'Sussex', phone: '55955843'})

        expect(res.status).toBe(200)
    })

    it('save the author if it is valid', async () => {
        jest.setTimeout(100000)
        const token = User().generateAuthToken()
        
        const res = await request(server)
        .post('/api/authors')
        .set('y-auth-header', token)
        .send({ name: 'Sussex', phone: '55955843'})
        
        expect(res.body).toHaveProperty('_id')
        expect(res.body).toHaveProperty('name', 'Sussex')
    })
    })


