import { InvalidParamError } from '@/presentation/errors'
import {
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  SaveSurveyResult
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        if (
          !survey.answers.some((surveyAnswer) => surveyAnswer.answer === answer)
        ) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        answer,
        surveyId,
        accountId,
        date: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
