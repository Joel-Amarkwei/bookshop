const request = require('supertest')
const _ = require('lodash')
const { User } = require('../../models/users')
const express = require('express')
const app = express()

let Server = app.listen(8000, () => '')

//inserting a new users, we'll use this user's property to validate passports / login
// it('POST /', async () => {
//     await User.insertMany([
//         {email: 'joel@gmail.com', password: 'joelme1', name: 'Joelle'},
//         {email: 'number@yahoo.com', password: 'numbersme2', name: 'Number'},
//         {email: 'system@gmail.com', password: 'systemme3', name: 'System'}
//     ])
//     const res = await request(server).post('/api/login')
//     expect(res.status).toBe(200)
// })

// a bad response for a bad request.
it('POST /', async () => {
   const res = await request(Server).post('/api/login')
   expect(res.status).toBe(404)
})

//request not found, cannot perform get request on this particular endpoint
it('GET /', async () => {
    const res = await request(Server).get('/api/login')
    expect(res.status).toBe(404)
})

it('POST /', async () => {
    const res = await request(Server)
        .post('/api/login')
        .send({ email: 'system@gmail.com' });
        
    expect(res.status).toBe(404)
})

