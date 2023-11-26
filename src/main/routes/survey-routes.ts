import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { userAuth } from '../middlewares/user-auth'

export default (router: Router): void => {
  const addSurveyController = adaptRoute(makeAddSurveyController())
  const loadSurveysController = adaptRoute(makeLoadSurveysController())
  router.post('/surveys', adminAuth, addSurveyController)
  router.get('/surveys', userAuth, loadSurveysController)
}
