import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import {
  SaveSurveyResultParams,
  SurveyResultModel
} from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    return new SaveSurveyResultRepositoryStub()
  }

export const mockLoadSurveyResultRepository =
  (): LoadSurveyResultRepository => {
    class LoadSurveyResultRespositoryStub
    implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    return new LoadSurveyResultRespositoryStub()
  }
