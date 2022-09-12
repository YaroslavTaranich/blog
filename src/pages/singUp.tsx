import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import UserForm, { IServerErrors } from '../components/UserForm/UserForm'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import Checkbox from '../components/UI/checkbox/checkbox'
import useAuth from '../context/authContext'

import styles from './pages.module.css'

type SignUpData = {
  username: string
  email: string
  password: string
}

const singIpSchema = Yup.object()
  .shape({
    username: Yup.string().min(3, 'Username must be more then 3 simbols').required('Username is reqrequired'),
    email: Yup.string().email('Email address is invalid').required('Email address is required'),
    password: Yup.string().min(6, 'Your password needs to be at least 6 characters.').required('Password is required'),
    repeat_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords does not match')
      .required('Repeat password is required'),
    policy: Yup.boolean().oneOf([true], 'Agreement is required'),
  })
  .required()

const resolver = yupResolver(singIpSchema)

const MakeFormErrors = (serverErrors: { [key: string]: string }) => {
  const res = Object.keys(serverErrors).reduce<IServerErrors<SignUpData>[]>((acc, key) => {
    if (key === 'email' || key === 'password' || key === 'username') {
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

function SignUp() {
  const { createUser, loading, error, user, loadingInitial } = useAuth()

  const onSubmit = ({ username, email, password }: SignUpData) => createUser(username, email, password)

  const navigete = useNavigate()

  const errorMessage = error && error.message ? <p className={styles.error}>{error.message}</p> : null

  useEffect(() => {
    if (user && !loadingInitial) navigete('/')
  }, [user, loadingInitial])

  return (
    <section>
      <UserForm<SignUpData>
        onSubmit={onSubmit}
        className={styles.sign_form}
        resolver={resolver}
        serverErrors={error && MakeFormErrors(error)}
      >
        <h2 className={styles.title}>Sign Up</h2>

        <Input name="username" placeholder="Username" label="Username" />

        <Input name="email" placeholder="Email address" label="Email address" />

        <Input name="password" placeholder="Password" label="Password" type="password" />

        <Input name="repeat_password" placeholder="Repeat Password" label="Repeat Password" type="password" />

        <hr className={styles.separator} />

        <Checkbox
          name="policy"
          label="I agree to the processing of my personal 
                  information"
        />

        <Button submit loading={loading}>
          Create
        </Button>
        {errorMessage}

        <p className={styles.secondary_text}>
          Already have an account?
          <Link to="/sign-in" className={styles.link}>
            Sign In.
          </Link>
        </p>
      </UserForm>
    </section>
  )
}

export default SignUp
