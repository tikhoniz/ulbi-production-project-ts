import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import { getProfileReadOnly, profileActions, updateProfileData } from '../../../../entities/Profile'
import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps): JSX.Element => {
  const { t } = useTranslation('profile')

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('profile')} />
      {readonly ? (
        <Button
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
          onClick={onEdit}
        >
          {t('editProfile')}
        </Button>
      ) : (
        <>
          <Button
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE_RED}
            onClick={onCancelEdit}
          >
            {t('cancelEditProfile')}
          </Button>
          <Button
            className={cls.saveBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onSave}
          >
            {t('saveProfile')}
          </Button>
        </>
      )}
    </div>
  )
}
