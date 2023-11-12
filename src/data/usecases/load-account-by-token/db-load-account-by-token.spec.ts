import { DbLoadAccountByToken } from './db-load-account-by-token'
import {
  AccountModel,
  Decrypter,
  LoadAccountByTokenRepository
} from './db-load-account-by-token-protocols'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
  implements LoadAccountByTokenRepository {
    async loadAccountByToken (
      token: string,
      role?: string
    ): Promise<AccountModel | null> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  )
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadAccountByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadAccountByToken'
    )
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadAccountByToken')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadAccountByToken')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
