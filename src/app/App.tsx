import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppSelector } from '@src/modules/shared/store'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import{ supabase } from '../../src/modules/shared/utils/supabase'
import { useState, useEffect } from 'react'

const App = () => {
  /* const [user, setUser] = useState({});
  useEffect(() => {
    getCurrentUser();
    window.addEventListener('hashchange', function() {
      getCurrentUser();
    });
  }, [])
  async function getCurrentUser() {
    const user = await supabase.auth.getUser();
    
    setUser(user);
  }
  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `http://localhost:3000/`,
      },
    })
  }
  async function signOut() {
    await supabase.auth.signOut();
    setUser({});
  }
  if (user) {
    console.log('user', user);
    return (
      <div className="App">
        <h1>Hello, user?</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
    )
  } */

  const queryClient = new QueryClient()
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)

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
