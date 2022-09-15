import { Path } from 'react-hook-form'

import { IServerErrors } from '../components/UserForm/UserForm'
import { IUser } from '../models/user'

interface ErrorData extends Partial<IUser> {
  'email or password': string
}

const makeError = (name: Path<ErrorData>, message: string): IServerErrors<ErrorData> => ({
  name,
  option: {
    type: 'server',
    message,
  },
})

const MakeFormErrors = (serverErrors: ErrorData) => {
  if (serverErrors['email or password']) {
    return [makeError('email', 'email or password is invalid'), makeError('password', 'email or password is invalid')]
  }
  const res = Object.keys(serverErrors).reduce<IServerErrors<ErrorData>[]>((acc, key) => {
    acc.push(makeError(key as Path<ErrorData>, `${key} ${serverErrors[key as Path<ErrorData>]}`))

    return acc
  }, [])
  return res
}

export default MakeFormErrors
