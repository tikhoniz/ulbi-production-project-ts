import { useTheme } from 'app/providers/ThemeProvider'
import { Suspense } from 'react'
import { classNames } from 'shared/lib/classNames/classnames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { AppRouter } from './router'
import './styles/index.scss'

const App = (): JSX.Element => {
  const { theme } = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
