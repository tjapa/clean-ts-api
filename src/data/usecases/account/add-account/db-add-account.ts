import {
  AddAccount,
  AddAccountParams,
  AccountModel,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel | null> {
    const accountExists =
      await this.loadAccountByEmailRepository.loadAccountByEmail(
        accountData.email
      )
    if (accountExists) {
      return null
    }
    const hashedPassword = await this.encrypter.hash(accountData.password)
    const newAccount = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    return newAccount
  }
}
