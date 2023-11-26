import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/load-surveys/load-surveys-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const userAuth = adaptMiddleware(makeAuthMiddleware())
  const addSurveyController = adaptRoute(makeAddSurveyController())
  const loadSurveysController = adaptRoute(makeLoadSurveysController())
  router.post('/surveys', adminAuth, addSurveyController)
  router.get('/surveys', userAuth, loadSurveysController)
}
