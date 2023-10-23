import { BugButton } from 'app/providers/ErrorBoundary'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const MainPage = (): JSX.Element => {
  const { t } = useTranslation('main')

  return (
    <div>
      {t('MainPage')}
      <BugButton />
    </div>
  )
}

export default memo(MainPage)
