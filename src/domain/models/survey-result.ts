export interface SurveyResultModel {
  surveyId: string
  question: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

interface SurveyResultAnswerModel {
  answer: string
  count: number
  percent: number
  image?: string
}
