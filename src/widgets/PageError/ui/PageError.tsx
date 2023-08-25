import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import cls from './PageError.module.scss'

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation()

  const reloadPage = (): void => location.reload()

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>{t('PageError')}</p>
      <button onClick={reloadPage}>{t('refreshPage')}</button>
    </div>
  )
}
