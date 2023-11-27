import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory/log-controller-decorator-factory'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '@/main/factories/usecases/db-load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveys = makeDbLoadSurveys()
  const loadSurveysController = new LoadSurveysController(loadSurveys)
  return makeLogControllerDecorator(loadSurveysController)
}
