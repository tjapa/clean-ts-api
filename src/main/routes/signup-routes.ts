import { Router } from 'express'
import { makeSignUpControler } from '../factories/signup'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  const signUpController = makeSignUpControler()
  router.post('/signup', adaptRoute(signUpController))
}
