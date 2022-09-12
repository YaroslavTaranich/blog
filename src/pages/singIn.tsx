import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import UserForm, { IServerErrors } from '../components/UserForm/UserForm'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import useAuth from '../context/authContext'

import styles from './pages.module.css'

type SignInData = {
  email: string
  password: string
}

const singUpSchema = Yup.object()
  .shape({
    email: Yup.string().email('Email address is invalid').required('Email address is required'),
    password: Yup.string().required('Password is required'),
  })
  .required()

const resolver = yupResolver(singUpSchema)

const MakeFormErrors = (serverErrors: { [key: string]: string }) => {
  if (serverErrors['email or password']) {
    return [
      {
        name: 'email',
        option: {
          type: 'server',
          message: 'email or password is invalid',
        },
      },
      {
        name: 'password',
        option: {
          type: 'server',
          message: 'email or password is invalid',
        },
      },
    ]
  }
  const res = Object.keys(serverErrors).reduce<IServerErrors<SignInData>[]>((acc, key) => {
    if (key === 'email' || key === 'password') {
      acc.push({
        name: key,
        option: {
          type: 'server',
          message: `${key} ${serverErrors[key]}`,
        },
      })
    }
    return acc
  }, [])
  return res
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
        resolver={resolver}
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
