import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import UserForm from '../components/UserForm/UserForm'
import singIpSchema from '../schemes/singIpSchema'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import Checkbox from '../components/UI/checkbox/checkbox'
import useAuth from '../context/authContext'
import MakeFormErrors from '../utils/makeFormErrorsFromServer'

import styles from './pages.module.css'

type SignUpData = {
  username: string
  email: string
  password: string
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
        resolver={yupResolver(singIpSchema)}
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
