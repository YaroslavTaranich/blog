import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import UserForm from '../components/UserForm/UserForm'
import profileSchema from '../schemes/profileSchema'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import { IUserFormData } from '../models/user'
import MakeFormErrors from '../utils/makeFormErrorsFromServer'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { clearError, setSuccess, updateProfile, getUserData } from '../redux/slices/userSlice'
import { FetchStatus, UserStatus } from '../models/enums'

import styles from './pages.module.css'

function Profile() {
  const { info, fetchStatus, userStatus, error } = useAppSelector(getUserData)
  const dispatch = useAppDispatch()

  const onSubmit = (data: IUserFormData) => dispatch(updateProfile(data))

  useEffect(() => {
    if (fetchStatus === FetchStatus.success && userStatus === UserStatus.update) {
      setTimeout(() => dispatch(setSuccess()), 4321)
    }
  }, [fetchStatus, userStatus])

  useEffect(() => {
    dispatch(clearError())
  }, [])

  const successMessage =
    fetchStatus === FetchStatus.success && userStatus === UserStatus.update ? (
      <p className={styles.success}>Successfully updated!</p>
    ) : null

  return (
    <section>
      {info && (
        <UserForm<IUserFormData>
          title="Edit Profile"
          loading={fetchStatus === FetchStatus.loading}
          onSubmit={onSubmit}
          resolver={yupResolver(profileSchema)}
          defaultValues={info}
          serverErrors={error && MakeFormErrors(error)}
        >
          <Input name="username" placeholder="Username" label="Username" />

          <Input name="email" placeholder="Email address" label="Email address" />

          <Input name="password" placeholder="New password" label="New password" type="password" />

          <Input name="image" placeholder="Avatar image" label="Avatar image (url)" />

          {successMessage}

          <Button submit loading={fetchStatus === FetchStatus.loading}>
            Save
          </Button>
        </UserForm>
      )}
    </section>
  )
}

export default Profile
