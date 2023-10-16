import { ObjectId } from 'mongodb'
import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = MongoHelper.map(
      accountData,
      result.insertedId.toHexString()
    )
    return account
  }

  async loadAccountByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ email })

    if (!result) {
      return null
    }

    const account = MongoHelper.map(result, result?._id.toHexString())
    return account as unknown as AccountModel
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
