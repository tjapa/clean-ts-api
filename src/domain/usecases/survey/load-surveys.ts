import { SurveyAnswer, SurveyModel } from '@/domain/models/survey'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}
