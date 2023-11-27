import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { userAuth } from '@/main/middlewares/user-auth'

export default (router: Router): void => {
  const addSurveyController = adaptRoute(makeAddSurveyController())
  const loadSurveysController = adaptRoute(makeLoadSurveysController())
  router.post('/surveys', adminAuth, addSurveyController)
  router.get('/surveys', userAuth, loadSurveysController)
}
