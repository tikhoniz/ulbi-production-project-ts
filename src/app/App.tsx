import { useTheme } from 'app/providers/ThemeProvider'
import { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classnames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { userActions } from '../entities/User'
import { AppRouter } from './providers/router'
import { useAppDispatch } from './providers/StoreProvider'

const App = (): JSX.Element => {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

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
