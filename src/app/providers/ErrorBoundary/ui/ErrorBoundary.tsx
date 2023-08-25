import React, {
  Component,
  Suspense,
  type ErrorInfo,
  type ReactNode
} from 'react'
import { PageError } from 'widgets/PageError/ui/PageError'

interface ErrorBoundaryProps {
  children?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

type ErrorBoundaryRender =
  | string
  | number
  | boolean
  | Iterable<React.ReactNode>
  | JSX.Element

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.log(error, errorInfo)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render(): ErrorBoundaryRender {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      // Можно отрендерить запасной UI произвольного вида
      // eslint-disable-next-line i18next/no-literal-string
      return (
        // чтобы подгрузились переводы нужно обернуть компонент в Suspense
        <Suspense fallback=''>
          <PageError />
        </Suspense>
      )
    }

    return children
  }
}

export default ErrorBoundary
