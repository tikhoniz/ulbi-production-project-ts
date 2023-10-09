import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Code } from 'shared/ui/Code/Code'
import { type ArticleCodeBlock } from '../../model/types/article'
import cls from './ArticleCodeBlockComponent.module.scss'
import { classNames } from 'shared/lib/classNames/classnames'

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props
    const { t } = useTranslation()

    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        <Code text={block.code} />
      </div>
    )
  }
)
