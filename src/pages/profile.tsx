import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import UserForm from '../components/UserForm/UserForm'
import profileSchema from '../schemes/profileSchema'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import useAuth from '../context/authContext'
import { IUser } from '../models/user'
import MakeFormErrors from '../utils/makeFormErrorsFromServer'

import styles from './pages.module.css'

type ProfileData = Partial<IUser>

function Profile() {
  const { updateUser, loading, error, user } = useAuth()
  const [success, setSuccess] = useState(false)
  const onSubmit = (data: ProfileData) => {
    updateUser(data).then((res) => setSuccess(res))
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 4321)
    }
  }, [success])

  const successMessage = success ? <p className={styles.success}>Successfully updated!</p> : null

  return (
    <section>
      {user && (
        <UserForm<ProfileData>
          onSubmit={onSubmit}
          className={styles.sign_form}
          resolver={yupResolver(profileSchema)}
          defaultValues={user}
          serverErrors={error && MakeFormErrors(error)}
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
        </UserForm>
      )}
    </section>
  )
}

export default Profile
