import { mockSurveyResultModel } from '@/domain/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import {
  LoadSurveyResult,
  LoadSurveyResultRepository,
  SurveyResultModel
} from './db-load-survey-result-protocols'

const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRespositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new LoadSurveyResultRespositoryStub()
}

interface SutTypes {
  sut: LoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)

  return { sut, loadSurveyResultRepositoryStub }
}

describe('DbLoadSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultRepository with correct value', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})
