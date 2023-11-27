import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeSignUpControler } from '@/main/factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  const signUpController = adaptRoute(makeSignUpControler())
  const loginController = adaptRoute(makeLoginController())
  router.post('/signup', signUpController)
  router.post('/login', loginController)
}
