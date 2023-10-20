import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpControler } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  const signUpController = makeSignUpControler()
  const loginController = makeLoginController()
  router.post('/signup', adaptRoute(signUpController))
  router.post('/login', adaptRoute(loginController))
}
