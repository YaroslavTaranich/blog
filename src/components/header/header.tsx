import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../../context/authContext'
import Button from '../UI/button/button'
import UserInfo from '../userInfo/userInfo'

import styles from './header.module.css'

function Header() {
  const navigate = useNavigate()
  const { user, loadingInitial, logout } = useAuth()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        RealWorld Blog
      </Link>
      {!user && !loadingInitial && (
        <>
          <Button
            type="ghost"
            size="lg"
            onClick={() => {
              navigate('/sign-in')
            }}
          >
            Sing In
          </Button>
          <Button
            type="success"
            size="lg"
            onClick={() => {
              navigate('/sign-up')
            }}
          >
            Sing Up
          </Button>
        </>
      )}
      {user && !loadingInitial && (
        <>
          <Button
            type="success"
            size="sm"
            onClick={() => {
              navigate('/new-article')
            }}
          >
            Create article
          </Button>
          <Link to="/profile">
            <UserInfo user={user} />
          </Link>
          <Button type="black" size="lg" onClick={() => logout()}>
            Log Out
          </Button>
        </>
      )}
    </header>
  )
}

export default Header
