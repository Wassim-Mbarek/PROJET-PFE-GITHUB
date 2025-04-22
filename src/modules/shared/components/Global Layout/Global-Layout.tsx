import { supabase } from '../../../shared/utils/supabase'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import './_Global-Layout.scss'
import LogoutIcon from '../../../shared/assets/icons/logout'
import Avatar from '../../../shared/components/Avatar/Avatar'
import { ReactNode } from 'react'

interface GlobalLayoutProps {
  children: ReactNode
}
const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    checkUser()
    window.addEventListener('hashchange', function () {
      checkUser()
    })
  }, [])

  async function checkUser() {
    const user = await supabase.auth.getUser()
    setUser(user.data.user)
    console.log('user', user.data.user)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    console.log('user', user)

    window.location.href = 'http://localhost:3000/login'
  }

  return (
    <div className="global-layout-module">
      <div className="global-layout-module__card">
        <div className="global-layout-module__card__header">
          <h1 className="global-layout-module__card__username">{user?.user_metadata?.user_name}</h1>
          <h3 className="global-layout-module__card__email">{user?.email}</h3>
        </div>
        <button className="global-layout-module__card__button" onClick={signOut}>
          <LogoutIcon />
        </button>
        <Avatar pic_url={user?.user_metadata?.avatar_url}></Avatar>
      </div>

      <div>{children}</div>
    </div>
  )
}

export default GlobalLayout
