import {
  LoadSurveyByIdRepository,
  LoadSurveyResult,
  LoadSurveyResultRepository,
  SurveyResultModel
} from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRespository: LoadSurveyByIdRepository
  ) { }

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResultModel =
      await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (surveyResultModel === null) {
      await this.loadSurveyByIdRespository.loadById(surveyId)
    }
    return surveyResultModel as SurveyResultModel
  }
}
