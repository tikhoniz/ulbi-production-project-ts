import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { Select } from 'shared/ui/Select/Select'
import { Currency } from '../../../../entities/Currency/model/types/currency'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  readonly?: boolean
  onChange?: (value: Currency) => void
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps): JSX.Element => {
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency)
      },
      [onChange]
    )

    return (
      <Select
        className={classNames('', {}, [className])}
        label={t('currency')}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    )
  }
)
