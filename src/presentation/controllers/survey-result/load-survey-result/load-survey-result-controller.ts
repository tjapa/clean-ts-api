import { ok } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyById } from '../save-survey-result/save-survey-result-controller-protocols'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return ok('')
  }
}
