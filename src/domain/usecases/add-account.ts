import { AccountModel } from '@/domain/models/account'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}

export type AddAccountModel = Omit<AccountModel, 'id'>
