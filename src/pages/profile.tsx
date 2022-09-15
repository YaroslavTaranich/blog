import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import UserForm from '../components/UserForm/UserForm'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import useAuth from '../context/authContext'
import { IUser } from '../models/user'

import styles from './pages.module.css'

type ProfileData = Partial<IUser>

const singIpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Email address is invalid'),
  password: Yup.string().min(6, 'Your password needs to be at least 6 characters.').required('Password is required'),
  image: Yup.string().url('Must be the correct url'),
})

const resolver = yupResolver(singIpSchema)

function Profile() {
  const { updateUser, loading, error, user } = useAuth()
  const [success, setSuccess] = useState(false)
  const onSubmit = (data: ProfileData) => {
    updateUser(data)
    setSuccess(true)
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 4321)
    }
  }, [success])

  const errorMessage = error ? <p className={styles.error}>{error}</p> : null

  const successMessage = success ? <p className={styles.success}>Successfully updated!</p> : null

  return (
    <section>
      {user && (
        <UserForm<ProfileData>
          onSubmit={onSubmit}
          className={styles.sign_form}
          resolver={resolver}
          defaultValues={user}
        >
          <h2 className={styles.title}>Edit Profile</h2>
          <Input name="username" placeholder="Username" label="Username" />

          <Input name="email" placeholder="Email address" label="Email address" />

          <Input name="password" placeholder="New password" label="New password" type="password" />

          <Input name="image" placeholder="Avatar image" label="Avatar image (url)" />

          {successMessage}

          <Button submit loading={loading}>
            Save
          </Button>
          {errorMessage}
        </UserForm>
      )}
    </section>
  )
}

export default Profile
