import { type Country } from '../../../../entities/Country'
import { type Currency } from '../../../../entities/Currency'
import { ProfileCard } from '../../../../entities/Profile'
import { ValidateProfileError } from '../../../../entities/Profile/model/types/profile'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import cls from './EditableProfileCard.module.scss'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import { VerticalStack } from 'shared/ui/Stack'

interface EditableProfileCardProps {
  className?: string
  id: string
}
// объявление редьюсеров
const reducers: ReducersList = {
  profile: profileReducer
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { id, className } = props
  const { t } = useTranslation('profile')

  const dispatch = useAppDispatch()
  // получаем данные из стейта
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

  // используется для того, что бы получение данных не срабатывало, если идет
  // иницилизация storybook
  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

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

  // const errorString = validateErrorTranslates[err]

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VerticalStack
        gap='8'
        fullWidth
        className={classNames(cls.EditableProfileCard, {}, [className])}
      >
        <EditableProfileCardHeader />
        {validateErrors?.length &&
          validateErrors.map((err: string) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              // TODO разобраться
              // text={errorString}
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
      </VerticalStack>
    </DynamicModuleLoader>
  )
})
