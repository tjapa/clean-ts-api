import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer2'
            }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        role: 'admin'
      })

      const id = res.insertedId.toHexString()
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { accessToken }
        }
      )
      const user = await accountCollection.findOne({ _id: new ObjectId(id) })

      console.log({ user })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer2'
            }
          ]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403)
    })
  })
})
