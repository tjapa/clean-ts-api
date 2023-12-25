import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  question: 'any_question',
  surveyId: 'any_id',
  answers: [
    {
      answer: 'any_answer',
      count: 1,
      percent: 50
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 10,
      percent: 80
    }
  ],
  date: new Date()
})

export const mockSurveyResultEmptyModel = (): SurveyResultModel => ({
  question: 'any_question',
  surveyId: 'any_id',
  answers: [
    {
      answer: 'any_answer',
      count: 0,
      percent: 0
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 0,
      percent: 0
    }
  ],
  date: new Date()
})

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})
