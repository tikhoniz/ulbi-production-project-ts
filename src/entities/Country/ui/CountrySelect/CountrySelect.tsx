import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Country } from '../../model/types/country'

interface CountrySelectProps {
  className?: string
  value?: Country
  readonly?: boolean
  onChange?: (value: Country) => void
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Ukraine, content: Country.Ukraine }
]

export const CountrySelect = memo(
  ({
    className,
    value,
    onChange,
    readonly
  }: CountrySelectProps): JSX.Element => {
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country)
      },
      [onChange]
    )
    // используя библиотеку Headless UI
    return (
      <ListBox
        onChange={onChangeHandler}
        value={value}
        defaultValue={t('Укажите страну')}
        label={t('Укажите страну')}
        items={options}
        readonly={readonly}
        direction='top right'
      />
    )
    // кастомный элемент
    // return (
    //   <Select
    //     className={classNames('', {}, [className])}
    //     label={t('country')}
    //     options={options}
    //     value={value}
    //     onChange={onChangeHandler}
    //     readonly={readonly}
    //   />
    // )
  }
)
