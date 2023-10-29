import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpControler } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  const signUpController = adaptRoute(makeSignUpControler())
  const loginController = adaptRoute(makeLoginController())
  router.post('/signup', signUpController)
  router.post('/login', loginController)
}
