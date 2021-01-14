const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../src/server/index')

const api = supertest(app)
const Persons = require('../src/server/models/person')

beforeAll(done => done())

beforeEach(async () => {
  await Persons.deleteMany({})

  const personObjects = helper.initialPersons
    .map(person => new Persons(person))

  const promiseArray = personObjects.map(person => person.save())
  await Promise.all(promiseArray)
})

describe("testing backend phonebook", () => {
  test('contacts are returned as correct json format', async () => {
    var response = await api.get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier property of the contacts posts is named id', async () => {
    const response = await api.get('/api/persons')
    response.body.forEach(res => {
      expect(res.id).toBeDefined()
    });
  })

  test('HTTP POST request creates new contact and length is increased by one', async () => {

    const preResponse = await api.get('/api/persons')
    var intitialLength = preResponse.body.length

    const newContact = 
      {
        name: "test user name",
        number: "9303030220"
      }
    await api.post('/api/persons')
      .send(newContact)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postResponse = await api.get('/api/persons')
    expect(postResponse.body).toHaveLength(intitialLength +1)
  })

  test('if the name or number properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const newInvalidContact = 
      {
        name: "abkhl",
      }
    await api.post('/api/persons')
      .send(newInvalidContact)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})