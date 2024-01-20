import { ArticleList } from '../../../../entities/Article'
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { VerticalStack } from 'shared/ui/Stack'
import { Text, TextSize } from 'shared/ui/Text/Text'

interface ArticleRecommendationListProps {
  className?: string
}

export const ArticleRecommendationList = memo(
  (props: ArticleRecommendationListProps) => {
    const { className } = props
    const { t } = useTranslation()
    // получаем список рекомендованных статей с помощью RTK query
    const {
      isLoading,
      data: articles,
      error
    } = useArticleRecommendationsList(3)

    if (isLoading || error) {
      return null
    }

    return (
      <VerticalStack gap='8' className={classNames('', {}, [className])}>
        <Text size={TextSize.L} title={t('comments')} />
        <ArticleList articles={articles} target='_blank' />
      </VerticalStack>
    )
  }
)
