/* компонент создан с помощью библиотеки
библиотека предоставляет компонент с функционалом, но без стилей
*/
import { Listbox as HListBox } from '@headlessui/react'
import { Fragment, type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { type DropdownDirection } from 'shared/types/dropdown'
import { Button } from '../Button/Button'
import { HorizontalStack } from '../Stack'
import cls from './Listbox.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft
}

export function ListBox(props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
    label
  } = props

  const optionsClasses = [mapDirectionClass[direction]]

  return (
    <HorizontalStack gap='4'>
      {label && <span>{`${label}>`}</span>}
      <HListBox
        as={'div'}
        disabled={readonly}
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button
          // disabled={readonly}
          className={cls.trigger}
        >
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>

        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled} // добавляем Fragment чтобы не создавалась лишняя нода
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [cls.active]: active,
                    [cls.disabled]: item.disabled
                  })}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HorizontalStack>
  )
}
