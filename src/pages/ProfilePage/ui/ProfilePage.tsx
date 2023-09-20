import { useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { ProfileCard, fetchProfileData, profileReducer } from '../../../../src/entities/Profile'

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
  id?: string
}

const ProfilePage = ({ className, id = '1' }: ProfilePageProps): JSX.Element => {
  // const { t } = useTranslation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(fetchProfileData(id))
  }, [dispatch, id])

  return (
    <DynamicModuleLoader
      reducers={reducers}
      // удаляем редьюсеры если ушли со страницы
      removeAfterUnmount
    >
      <div className={classNames('', {}, [className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
