//Things to take note before executing these tests can be found at the very buttom of this file, rsvp.

const request = require('supertest')
const mongoose = require('mongoose')
const _ = require('lodash')
const { Author } = require('../../models/authors')
const { User } = require('../../models/users')

// creating a server
let server;

//describing some properties of the /api/authors api endpoint
describe('/api/authors', async () => {
    // before each importation the server is activated to handle each request individually.
    beforeEach(() => { server = require('../../index') })
    
    //after each importation the server is deactivated to make sure that it runs every request just once.
    afterEach( async () => { server.close()
                        await Author.remove({})
                            })
                            
    it('GET /', async () => {
        //inserting a number of properties into the Author's field
        await Author.insertMany([
            { name: 'Ravimax', phone: '90909900'},
            { name: 'Nummax', phone: '887766778'},
            { name: 'Summax', phone: '112211212'}
        ])
        //this test checks if the response status is fine
        const res = await request(server).get('/api/authors')
        expect(res.status).toBe(200)
       // expect(res.body.length).toBe(3) -> this one was just to check the the length of the content of the response
        
        //these two last tests if a particular property is present in the any of the field amongst the Authors database.
        expect(res.body.some((g) => g.name === 'Ravimax')).toBeTruthy()
        expect(res.body.some((a) => a.phone === '90909900')).toBeTruthy()
        
    })

    describe('/:id', () => {
    //yeah so as the name suggests this one is basically testing for
    it('should return a 404 status if author is not found', async () => {
        await Author.findById('5e67f37baef3a907d5a0de27')

        const res = await request(server).get('/:id')
        
        expect(res.status).toBe(404)
    })

        //I've comment most of the content of this test because it relies on the solely on a specific kind of
        //request with made with a user ID credential direct from the database.
    it('should return an author with the given ID', async () => {
        // let author = new Author({ name: 'Ravimax', phone: '90909900'})
        // author = author.save()

        // const res = await request(server).get('/:id')

        // let results = await Author.findById(author._id)
        
        // expect(results.name).toBe('Ravimax')
        // expect(results.phone).toBe('90909900')
    })
  })

    // yeah so this one follows similarly as the previous ones ie making a User's request
  describe('POST /', () => {
    it('should return a 401 if client is not logged in', async () => {
        const res = await request(server)
        .post('/api/authors')
        .send({ name: 'Sussex', phone: '2938485843'})

        expect(res.status).toBe(401)
    })
    
      //here with the help of json web token I encoded some properties and and made headings out of it, this test
      //this plays around that idea.
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

/* 
Things to take note of before you can run these tests are,......
-   After installing each of the necessary node modules you'll also to import the User and the Author property from the
    respective folder. The links to the respective folders have been added together with this link.
-   You'll also need the database to run the base on some fed in data, the database configuration link is also added.
-   You'll also need need the generateAuthToken from the User model file.
NB: There're lots of test that can be performed using this, these samples tests are just a few.
    Questions for more clarifications are humbly welcomed.
*/



