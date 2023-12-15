import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/db-load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const dbLoadSurveyById = makeDbLoadSurveyById()
  const saveSurveyResult = makeDbSaveSurveyResult()
  const controller = new SaveSurveyResultController(
    dbLoadSurveyById,
    saveSurveyResult
  )
  return makeLogControllerDecorator(controller)
}
