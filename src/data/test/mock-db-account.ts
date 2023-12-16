import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import {
  AccountModel,
  AddAccountParams,
  LoadAccountByEmailRepository
} from '@/data/usecases/account/add-account/db-add-account-protocols'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      const fakeAccount: AccountModel = mockAccountModel()
      return await new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub
    implements LoadAccountByTokenRepository {
      async loadAccountByToken (
        token: string,
        role?: string
      ): Promise<AccountModel | null> {
        return mockAccountModel()
      }
    }
    return new LoadAccountByTokenRepositoryStub()
  }

export const mockLoadAccountByEmailRepository =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
      async loadAccountByEmail (email: string): Promise<AccountModel | null> {
        return mockAccountModel()
      }
    }
    return new LoadAccountByEmailRepositoryStub()
  }

export const mockUpdateAccessTokenRepository =
  (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
    implements UpdateAccessTokenRepository {
      async updateAccessToken (id: string, token: string): Promise<void> {}
    }
    return new UpdateAccessTokenRepositoryStub()
  }
