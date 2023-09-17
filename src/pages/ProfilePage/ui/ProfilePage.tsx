import { profileReducer } from '../../../../src/entities/Profile'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps): JSX.Element => {
  const { t } = useTranslation()
  return (
    <DynamicModuleLoader
      reducers={reducers}
      // удаляем редьюсеры если ушли со страницы
      removeAfterUnmount
    >
      <div className={classNames('', {}, [className])}>{t('ProfilePage')}</div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
