import { useCallback, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import {
  ProfileCard,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadOnly,
  getProfileValidateErrors,
  profileActions,
  profileReducer
} from '../../../../src/entities/Profile'
import { type Country } from '../../../entities/Country'
import { type Currency } from '../../../entities/Currency'
import { ValidateProfileError } from '../../../entities/Profile/model/types/profile'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
  id?: string
}

const ProfilePage = ({ className, id = '1' }: ProfilePageProps): JSX.Element => {
  const { t } = useTranslation('')
  const dispatch = useAppDispatch()
  const formData = useAppSelector(getProfileForm)
  const isLoading = useAppSelector(getProfileIsLoading)
  const error = useAppSelector(getProfileError)
  const readonly = useAppSelector(getProfileReadOnly)
  const validateErrors = useAppSelector(getProfileValidateErrors)

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('errors.serverError'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('errors.incorrect_country'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('errors.incorrect_user_data'),
    [ValidateProfileError.INCORRECT_AGE]: t('errors.incorrect_age'),
    [ValidateProfileError.NO_DATA]: t('errors.no_data')
  }

  useEffect(() => {
    // проверка для сторибука
    if (__PROJECT__ !== 'storybook') {
      void dispatch(fetchProfileData())
    }
  }, [dispatch])

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value ?? '' }))
    },
    [dispatch]
  )
  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value ?? '' }))
    },
    [dispatch]
  )
  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value ?? 0) }))
    },
    [dispatch]
  )
  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value ?? '' }))
    },
    [dispatch]
  )
  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value ?? '' }))
    },
    [dispatch]
  )
  const onChangeUserName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value ?? '' }))
    },
    [dispatch]
  )
  const onChangeCurrency = useCallback(
    (currency?: Currency) => {
      dispatch(profileActions.updateProfile({ currency }))
    },
    [dispatch]
  )
  const onChangeCountry = useCallback(
    (country?: Country) => {
      dispatch(profileActions.updateProfile({ country }))
    },
    [dispatch]
  )

  return (
    <DynamicModuleLoader
      reducers={reducers}
      // удаляем редьюсеры если ушли со страницы
      removeAfterUnmount
    >
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length &&
          validateErrors.map(err => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeAvatar={onChangeAvatar}
          onChangeUserName={onChangeUserName}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
