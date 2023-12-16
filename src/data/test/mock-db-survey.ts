import {
  AddSurveyParams,
  AddSurveyRepository,
  SurveyModel
} from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {}
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepositoryStub =
  (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
      async loadById (id: string): Promise<SurveyModel> {
        return mockSurveyModel()
      }
    }
    return new LoadSurveyByIdRepositoryStub()
  }

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return mockSurveyModels()
    }
  }
  return new LoadRepositoryStub()
}
