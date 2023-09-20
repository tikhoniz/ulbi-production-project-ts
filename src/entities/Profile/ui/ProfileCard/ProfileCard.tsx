import getProfileData from '../../../../entities/Profile/model/selectors/getProfileData/getProfileData'
// import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError'
// import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text } from 'shared/ui/Text/Text'
import cls from './ProfileCard.module.scss'
import { useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps): JSX.Element => {
  const { t } = useTranslation('profile')

  const data = useAppSelector(getProfileData)
  // const isLoading = useAppSelector(getProfileIsLoading)
  // const error = useAppSelector(getProfileError)

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')} />
        <Button
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={data?.first}
          placeholder='Ваше имя'
          className={cls.input}
        />
        <Input
          value={data?.lastname}
          placeholder='Ваша фамилия'
          className={cls.input}
        />
      </div>
    </div>
  )
}
