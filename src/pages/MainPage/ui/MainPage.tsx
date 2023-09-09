import { BugButton } from 'app/providers/ErrorBoundary'
import { Counter } from 'entitiesc/Counter'
// import { Counter } from 'entities/Counter'
import { useTranslation } from 'react-i18next'

const MainPage = (): JSX.Element => {
  const { t } = useTranslation('main')

  return (
    <div>
      {t('MainPage')}
      <Counter />
      <BugButton />
    </div>
  )
}

export default MainPage
