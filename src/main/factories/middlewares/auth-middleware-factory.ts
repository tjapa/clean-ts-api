import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { makeDbLoadAccountByToken } from '@/main/factories/usecases/db-load-account-by-token/load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const loadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(loadAccountByToken, role)
}
