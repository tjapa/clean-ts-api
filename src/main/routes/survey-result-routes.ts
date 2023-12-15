import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { userAuth } from '@/main/middlewares/user-auth'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  const saveSurveyResultController = adaptRoute(
    makeSaveSurveyResultController()
  )
  router.put('/surveys/:surveyId/results', userAuth, saveSurveyResultController)
}
