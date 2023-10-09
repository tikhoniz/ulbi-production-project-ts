import React, { type FC, memo } from 'react'
import cls from './Icon.module.scss'
import { classNames } from 'shared/lib/classNames/classnames'

interface IconProps {
  className?: string
  Svg: FC<React.SVGProps<SVGSVGElement>>
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg } = props

  return <Svg className={classNames(cls.Icon, {}, [className])} />
})
