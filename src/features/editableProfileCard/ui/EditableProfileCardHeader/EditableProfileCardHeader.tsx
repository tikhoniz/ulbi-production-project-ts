import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'

import { getUserAuthData } from '../../../../entities/User'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/profileSlice'
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly'
import { useAppDispatch } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { HorizontalStack } from 'shared/ui/Stack'

interface EditableProfileCardHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props

    const { t } = useTranslation('profile')
    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)
    const canEdit = authData?.id === profileData?.id
    const readonly = useSelector(getProfileReadOnly)
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
      dispatch(updateProfileData())
    }, [dispatch])

    return (
      <HorizontalStack
        fullWidth
        justify='between'
        className={classNames('', {}, [className])}
      >
        <Text title={t('Профиль')} />
        {canEdit && (
          <div>
            {readonly ? (
              <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                {t('Редактировать')}
              </Button>
            ) : (
              <HorizontalStack gap='8'>
                <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                  {t('Отменить')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                  {t('Сохранить')}
                </Button>
              </HorizontalStack>
            )}
          </div>
        )}
      </HorizontalStack>
    )
  }
)
