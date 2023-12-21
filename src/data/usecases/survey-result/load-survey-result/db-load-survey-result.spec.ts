import { mockSurveyResultModel } from '@/domain/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import {
  LoadSurveyResultRepository,
  SurveyResultModel
} from './db-load-survey-result-protocols'

describe('DbLoadSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultRepository with correct value', async () => {
    class LoadSurveyResultRespositoryStub
    implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRespositoryStub()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})
