import {
  AddSurveyParams,
  AddSurveyRepository
} from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import {
  LoadSurveysRepository,
  SurveyModel
} from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository
implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    const surveysWithId = surveys.map((survey) =>
      MongoHelper.map(survey, survey?._id.toHexString())
    )
    return surveysWithId
  }

  async loadById (id: string): Promise<SurveyModel | null> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    if (!survey) {
      return null
    }
    const surveysWithId = MongoHelper.map(survey, survey?._id.toHexString())
    return surveysWithId
  }
}
