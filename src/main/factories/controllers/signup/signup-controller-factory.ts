import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/db-authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/db-add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory/log-controller-decorator-factory'

export const makeSignUpControler = (): Controller => {
  const addAccount = makeDbAddAccount()
  const validationComposite = makeSignUpValidation()
  const dbAuthentication = makeDbAuthentication()
  const signUpController = new SignUpController(
    addAccount,
    validationComposite,
    dbAuthentication
  )
  return makeLogControllerDecorator(signUpController)
}
