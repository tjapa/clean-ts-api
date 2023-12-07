import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection =
      await MongoHelper.getCollection('surveysResults')
    const surveyResult = await surveyResultCollection.findOneAndUpdate(
      { surveyId: data.surveyId, accountId: data.accountId },
      {
        $set: {
          answer: data.answer,
          date: data.date
        }
      },
      { upsert: true, returnDocument: 'after' }
    )
    return MongoHelper.map(
      surveyResult.value,
      surveyResult.value?._id.toHexString()
    )
  }
}
