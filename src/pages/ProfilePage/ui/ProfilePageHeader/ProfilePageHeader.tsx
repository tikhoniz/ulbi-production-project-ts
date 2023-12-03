import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { HorizontalStack } from 'shared/ui/Stack/HorizontalStack/HorizontalStack'
import { Text } from 'shared/ui/Text/Text'
import {
  getProfileData,
  getProfileReadOnly,
  profileActions,
  updateProfileData
} from '../../../../entities/Profile'
import { getUserAuthData } from '../../../../entities/User'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({
  className
}: ProfilePageHeaderProps): JSX.Element => {
  const { t } = useTranslation('profile')
  // получаем данные из стейта
  const authData = useAppSelector(getUserAuthData)
  const profileData = useAppSelector(getProfileData)
  const canEdit = authData?.id === profileData?.id
  const readonly = useAppSelector(getProfileReadOnly)

  const dispatch = useAppDispatch()

  // Используем useCallback поскольку передаем пропсом
  // чтобы функции каждый раз при рендеренге не создавали новые ссылки, нужно обернуть их в useCallback
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(async () => {
    await dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HorizontalStack
      fullWidth
      justify={'between'}
      className={classNames('', {}, [className])}
    >
      <Text title={t('profile')} />
      {canEdit && (
        <>
          {readonly ? (
            <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
              {t('editProfile')}
            </Button>
          ) : (
            <HorizontalStack gap={'8'}>
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                {t('cancelEditProfile')}
              </Button>
              <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                {t('saveProfile')}
              </Button>
            </HorizontalStack>
          )}
        </>
      )}
    </HorizontalStack>
  )
}
