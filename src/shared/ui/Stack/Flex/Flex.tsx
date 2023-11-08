// CSS: Компонент для позиционирования
import { type ReactNode } from 'react'
import { type Mods, classNames } from 'shared/lib/classNames/classnames'
import cls from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexGap =
  | '2'
  | '4'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween
}

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd
}

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn
}

const gapClasses: Record<FlexGap, string> = {
  2: cls.gap2,
  4: cls.gap4,
  6: cls.gap6,
  8: cls.gap8,
  10: cls.gap10,
  12: cls.gap12,
  16: cls.gap16,
  20: cls.gap20,
  24: cls.gap24,
  28: cls.gap28,
  32: cls.gap32
}

export interface FlexProps {
  className?: string
  children: ReactNode
  justify?: FlexJustify
  align?: FlexAlign
  direction: FlexDirection
  gap?: FlexGap
  fullWidth?: boolean
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    fullWidth
  } = props

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    // если gap указан, добавляем его
    gap && gapClasses[gap]
  ]

  const mods: Mods = {
    [cls.fullWidth]: fullWidth
  }

  return <div className={classNames(cls.Flex, mods, classes)}>{children}</div>
}
