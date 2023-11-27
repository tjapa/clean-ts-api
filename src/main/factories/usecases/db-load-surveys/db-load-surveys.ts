import { DbLoadSurveys } from '@/data/usecases/load-surveys/db-load-surveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveys = (): DbLoadSurveys => {
  const accountMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(accountMongoRepository)
}
