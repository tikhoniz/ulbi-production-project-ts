import { BugButton } from 'app/providers/ErrorBoundary'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/ListBox/ListBox'

const MainPage = (): JSX.Element => {
  const { t } = useTranslation('main')

  return (
    <div>
      {t('MainPage')}
      <ListBox
        defaultValue='Выберите значение'
        onChange={(value: string) => {}}
        value={undefined}
        items={[
          { value: '1', content: '123' },
          { value: '2', content: 'qwerty' },
          { value: '3', content: 'top', disabled: true },
          { value: '4', content: 'down' },
          { value: '5', content: 'list' }
        ]}
      />
      <BugButton />
    </div>
  )
}

export default memo(MainPage)
