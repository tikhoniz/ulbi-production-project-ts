import { useTranslation } from 'react-i18next'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { HorizontalStack, VerticalStack } from 'shared/ui/Stack'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { type Country } from '../../../../entities/Country/model/types/country'
import { CountrySelect } from '../../../../entities/Country/ui/CountrySelect/CountrySelect'
import { CurrencySelect, type Currency } from '../../../../entities/Currency'
import { type Profile } from '../../../../entities/Profile/model/types/profile'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  onChangeLastname?: (value?: string) => void
  onChangeFirstname?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeUserName?: (value?: string) => void
  onChangeCurrency?: (currency?: Currency) => void
  onChangeCountry?: (country?: Country) => void
}

export const ProfileCard = (props: ProfileCardProps): JSX.Element => {
  const {
    data,
    isLoading,
    error,
    className,
    onChangeLastname,
    onChangeFirstname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUserName,
    onChangeCurrency,
    onChangeCountry,
    readonly
  } = props
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <HorizontalStack
        justify='center'
        fullWidth
        className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </HorizontalStack>
    )
  }

  if (error) {
    return (
      <HorizontalStack
        justify='center'
        fullWidth
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('some error in profile')}
          text={t('reload page')}
          align={TextAlign.CENTER}
        />
      </HorizontalStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <VerticalStack
      gap='16'
      fullWidth
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HorizontalStack
          justify='center'
          fullWidth
          className={cls.avatarWrapper}
        >
          <Avatar src={data?.avatar} alt='avatar' />
        </HorizontalStack>
      )}
      <Input
        value={data?.first}
        placeholder='Ваше имя'
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
      />
      <Input
        value={data?.lastname}
        placeholder='Ваша фамилия'
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <Input
        value={data?.age}
        placeholder='Ваш возраст'
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder='Город'
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder='Введите ссылку на аватар'
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder='Введите имя пользователя'
        className={cls.input}
        onChange={onChangeUserName}
        readonly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        readonly={readonly}
        onChange={onChangeCurrency}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        readonly={readonly}
        onChange={onChangeCountry}
      />
    </VerticalStack>
  )
}
