import {
  AccountModel,
  Decrypter,
  LoadAccountByToken,
  LoadAccountByTokenRepository
} from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    const tokenDecrypted = await this.decrypter.decrypt(accessToken)
    if (tokenDecrypted) {
      await this.loadAccountByTokenRepository.loadAccountByToken(
        accessToken,
        role
      )
    }
    return null
  }
}
