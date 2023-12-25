import { SurveyModel } from '../../survey/add-survey/db-add-survey-protocols'
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
    let surveyResult =
      await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (surveyResult === null) {
      const survey = (await this.loadSurveyByIdRespository.loadById(
        surveyId
      )) as SurveyModel
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map((answer) => ({
          ...answer,
          count: 0,
          percent: 0
        }))
      }
    }
    return surveyResult
  }
}
