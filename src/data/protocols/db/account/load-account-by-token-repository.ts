import { AccountModel } from '@/data/usecases/account/add-account/db-add-account-protocols'

export interface LoadAccountByTokenRepository {
  loadAccountByToken: (
    token: string,
    role?: string,
  ) => Promise<AccountModel | null>
}
