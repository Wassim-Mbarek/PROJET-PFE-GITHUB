import CardBalance from '../../../shared/components/Cards/Card-BALANCE/Card-balance'
import GithubIcon from '../../../shared/assets/icons/github'
import { supabase } from '../../../shared/utils/supabase'
import { PATH } from '../../routes/paths'

const Login = () => {
  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `http://localhost:3000${PATH.REPOSITORIES}`,
      },
    })
  }

  return (
    <div className="login-module">
      <CardBalance>
        <div className="login-module__card">
          <p className="login-module__card__title">Welcome</p>
          <p className="login-module__card__subtitle">
            Login via your Github account to get started with our app
          </p>
          <button className="login-module__card__button" onClick={signInWithGithub}>
            <GithubIcon className="login-module__card__button__icon" />
            <p className="login-module__card__button__text"> Sign In With Github </p>
          </button>
        </div>
      </CardBalance>
    </div>
  )
}

export default Login
