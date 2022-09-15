import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import UserForm from '../components/UserForm/UserForm'
import singUpSchema from '../schemes/singUpSchema'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import useAuth from '../context/authContext'
import MakeFormErrors from '../utils/makeFormErrorsFromServer'

import styles from './pages.module.css'

type SignInData = {
  email: string
  password: string
}

function SignIn() {
  const { login, loading, error, user, loadingInitial } = useAuth()
  const navigete = useNavigate()

  const onSubmit = ({ email, password }: SignInData) => login(email, password)

  useEffect(() => {
    if (user && !loadingInitial) navigete('/')
  }, [user, loadingInitial])

  return (
    <section>
      <UserForm<SignInData>
        onSubmit={onSubmit}
        className={styles.sign_form}
        resolver={yupResolver(singUpSchema)}
        serverErrors={error && MakeFormErrors(error)}
      >
        <h2 className={styles.title}>Sign In</h2>
        <Input<SignInData> name="email" placeholder="Email address" label="Email address" />
        <Input<SignInData> name="password" placeholder="Password" label="Password" type="password" />
        <Button submit loading={loading}>
          Login
        </Button>
        <p className={styles.secondary_text}>
          Don’t have an account?
          <Link to="/sign-up" className={styles.link}>
            Sign Up.
          </Link>
        </p>
      </UserForm>
    </section>
  )
}

export default SignIn
