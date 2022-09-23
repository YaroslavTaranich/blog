import { Path } from 'react-hook-form'

import { IServerError } from '../components/UserForm/UserForm'
import { IUserError } from '../models/user'

const makeError = (name: Path<IUserError>, message: string): IServerError<IUserError> => ({
  name,
  option: {
    type: 'server',
    message,
  },
})

const MakeFormErrors = (serverErrors: IUserError) => {
  if (serverErrors['email or password']) {
    return [makeError('email', 'email or password is invalid'), makeError('password', 'email or password is invalid')]
  }
  const res = Object.keys(serverErrors).reduce<IServerError<IUserError>[]>((acc, key) => {
    acc.push(makeError(key as Path<IUserError>, `${key} ${serverErrors[key as Path<IUserError>]}`))

    return acc
  }, [])
  return res
}

export default MakeFormErrors
