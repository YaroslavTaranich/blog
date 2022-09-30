import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import UserForm from '../components/UserForm/UserForm'
import singIpSchema from '../schemes/singIpSchema'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import Checkbox from '../components/UI/checkbox/checkbox'
import MakeFormErrors from '../utils/makeFormErrorsFromServer'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { clearError, signUp, getUserData } from '../redux/slices/userSlice'
import { ISignUpData } from '../models/user'
import { FetchStatus } from '../models/enums'

import styles from './pages.module.css'

function SignUp() {
  const { info: user, error, fetchStatus, loadingInitial } = useAppSelector(getUserData)
  const dispatch = useAppDispatch()

  const onSubmit = ({ username, email, password }: ISignUpData) => dispatch(signUp({ username, email, password }))

  const navigete = useNavigate()

  useEffect(() => {
    if (user && !loadingInitial) navigete('/')
  }, [user, loadingInitial])

  useEffect(() => {
    dispatch(clearError())
  }, [])

  return (
    <section>
      <UserForm<ISignUpData>
        onSubmit={onSubmit}
        loading={fetchStatus === FetchStatus.loading}
        title="Sign Up"
        resolver={yupResolver(singIpSchema)}
        serverErrors={error && MakeFormErrors(error)}
      >
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

        <Button submit loading={fetchStatus === FetchStatus.loading}>
          Create
        </Button>

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
