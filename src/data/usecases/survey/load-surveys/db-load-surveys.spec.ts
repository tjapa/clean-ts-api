import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import MockDate from 'mockdate'
import { mockSurveyModels, throwError } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return { sut, loadSurveysRepositoryStub }
}

describe('DbLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockImplementationOnce(throwError)
    const surveys = sut.load()
    await expect(surveys).rejects.toThrow()
  })
})
