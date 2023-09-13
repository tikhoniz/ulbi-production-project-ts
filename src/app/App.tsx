import { useTheme } from 'app/providers/ThemeProvider'
import { userActions } from '../entities/User'
import { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classnames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useAppDispatch } from './providers/StoreProvider/config/store'
import { AppRouter } from './providers/router'

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
