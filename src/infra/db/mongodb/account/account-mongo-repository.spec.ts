import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadAccountByEmail()', () => {
    test('Should return an account on loadAccountByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.loadAccountByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })

    test('Should return null if loadAccountByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadAccountByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessTokenSuccess', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const accountId = res.insertedId

      const accountWithoutToken = await accountCollection.findOne({
        _id: accountId
      })
      expect(accountWithoutToken).toBeTruthy()
      expect(accountWithoutToken?.accessToken).toBeFalsy()

      await sut.updateAccessToken(accountId.toHexString(), 'any_token')
      const accountWithToken = await accountCollection.findOne({
        _id: accountId
      })
      expect(accountWithToken).toBeTruthy()
      expect(accountWithToken?.name).toBe('any_name')
      expect(accountWithToken?.email).toBe('any_email@mail.com')
      expect(accountWithToken?.password).toBe('any_password')
      expect(accountWithToken?.accessToken).toBe('any_token')

      await sut.updateAccessToken(accountId.toHexString(), 'another_token')
      const accountWithAnotherToken = await accountCollection.findOne({
        _id: accountId
      })
      expect(accountWithAnotherToken).toBeTruthy()
      expect(accountWithAnotherToken?.name).toBe('any_name')
      expect(accountWithAnotherToken?.email).toBe('any_email@mail.com')
      expect(accountWithAnotherToken?.password).toBe('any_password')
      expect(accountWithAnotherToken?.accessToken).toBe('another_token')
    })
  })

  describe('loadAccountByToken()', () => {
    test('Should return an account on loadAccountByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadAccountByToken('any_token')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })

    test('Should return an account on loadAccountByToken with role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'any_role'
      })
      const account = await sut.loadAccountByToken('any_token', 'any_role')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })

    test('Should return null if loadAccountByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadAccountByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
