import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { userAuth } from '@/main/middlewares/user-auth'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { makeLoadSurveyResultController } from '../factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'

export default (router: Router): void => {
  const saveSurveyResultController = adaptRoute(
    makeSaveSurveyResultController()
  )
  const loadSurveyResultController = adaptRoute(
    makeLoadSurveyResultController()
  )
  router.put('/surveys/:surveyId/results', userAuth, saveSurveyResultController)
  router.get('/surveys/:surveyId/results', userAuth, loadSurveyResultController)
}
