import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import cls from './ArticleTextBlockComponent.module.scss'
import { classNames } from 'shared/lib/classNames/classnames'
import { type ArticleTextBlock } from '../../../../entities/Article/model/types/article'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props
    const { t } = useTranslation()

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph, index) => (
          <Text key={paragraph} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    )
  }
)
