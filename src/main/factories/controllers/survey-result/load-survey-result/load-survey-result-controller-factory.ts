import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/db-load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/load-survey-result/db-load-survey-result-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'

export const makeLoadSurveyResultController = (): Controller => {
  const dbLoadSurveyById = makeDbLoadSurveyById()
  const dbLoadSurveyResult = makeDbLoadSurveyResult()
  const controller = new LoadSurveyResultController(
    dbLoadSurveyById,
    dbLoadSurveyResult
  )
  return makeLogControllerDecorator(controller)
}
