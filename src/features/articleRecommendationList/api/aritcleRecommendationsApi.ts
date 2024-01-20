import { rtkApi } from 'shared/api/rtkApi'

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit
        }
      })
    })
  })
})
//  rtkQuery автоматически генерирует хук по названию эндпоинта, в данном примере getArticleRecommendationsList эндпоинт, recommendationsApi.useGetArticleRecommendationsListQuery автоматически сгенерированный хук

export const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsListQuery
