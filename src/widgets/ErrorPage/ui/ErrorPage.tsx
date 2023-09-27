import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import cls from './ErrorPage.module.scss'

interface ErrorPageProps {
  className?: string
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const { t } = useTranslation()

  const reloadPage = (): void => location.reload()

  return (
    <div className={classNames(cls.ErrorPage, {}, [className])}>
      <p>{t('ErrorPage')}</p>
      <button onClick={reloadPage}>{t('refreshPage')}</button>
    </div>
  )
}
