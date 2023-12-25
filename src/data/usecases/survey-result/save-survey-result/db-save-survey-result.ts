import { LoadSurveyResultRepository } from '../load-survey-result/db-load-survey-result-protocols'
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
  SurveyResultModel
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId
    )
    return (await surveyResult) as SurveyResultModel
  }
}
