// глобальная декларация типов

// включает возможность использовать модули
declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classnames: IClassNames
  export = classnames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
  import { type ReactElement, type SVGProps } from 'react'
  const content: (props: SVGProps<SVGElement>) => ReactElement
  export default content
}

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __IS_DEV__: boolean
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __API__: string
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest'

// используем свой DeepPartial вместо редаксовского, потому как редаксовский не работает
// DeepPartial используется для того чтоьы сделать все поля стейта необязательными, нужно для тестирования

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
// модифицированный type Record, в нем делаем поля необязательными
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
