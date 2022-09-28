import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getUserData, logOut } from '../../redux/slices/userSlice'
import Button from '../UI/button/button'
import UserInfo from '../userInfo/userInfo'

import styles from './header.module.css'

function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { info, loadingInitial } = useAppSelector(getUserData)

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        RealWorld Blog
      </Link>
      {!info && !loadingInitial && (
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
      {info && !loadingInitial && (
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
            <UserInfo user={info} />
          </Link>
          <Button
            type="black"
            size="lg"
            onClick={() => {
              dispatch(logOut())
            }}
          >
            Log Out
          </Button>
        </>
      )}
    </header>
  )
}

export default memo(Header)
