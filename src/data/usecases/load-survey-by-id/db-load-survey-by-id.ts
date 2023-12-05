import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import {
  LoadSurveyByIdRepository,
  SurveyModel
} from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) { }

  async loadById (id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(id)
    return {} as unknown as SurveyModel
  }
}
