import {
  mockLoadSurveyByIdRepository,
  mockLoadSurveyResultRepository
} from '@/data/test'
import {
  mockSurveyResultEmptyModel,
  mockSurveyResultModel,
  throwError
} from '@/domain/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import {
  LoadSurveyByIdRepository,
  LoadSurveyResult,
  LoadSurveyResultRepository
} from './db-load-survey-result-protocols'
import MockDate from 'mockdate'

interface SutTypes {
  sut: LoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  )

  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub }
}

describe('DbLoadSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyResultRepository with correct value', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError)
    const surveys = sut.load('any_survey_id')
    await expect(surveys).rejects.toThrow()
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub
    } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null))
    await sut.load('any_survey_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return surveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null))
    const surveyResultModel = await sut.load('any_survey_id')
    expect(surveyResultModel).toEqual(mockSurveyResultEmptyModel())
  })

  test('Should return a SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResultModel = await sut.load('any_survey_id')
    expect(surveyResultModel).toEqual(mockSurveyResultModel())
  })
})
