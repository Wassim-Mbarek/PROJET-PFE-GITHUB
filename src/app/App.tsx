import { login } from '@src/modules/auth/data/authThunk'
import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.scss'

const App = () => {
  const queryClient = new QueryClient()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)

  useEffect(() => {
    dispatch(login())
  }, [dispatch])

  return (
    <div id={theme}>
      <Helmet>
        <title>Welcome - Github code reviewer</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>{renderRoutes(routes)}</QueryClientProvider>
    </div>
  )
}

export default App
