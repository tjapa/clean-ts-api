import { SurveyModel } from '../models/survey'

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}

export type AddSurveyModel = Omit<SurveyModel, 'id'>
