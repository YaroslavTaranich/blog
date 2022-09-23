export interface IUser {
  username: string
  email: string
  token: string
  password?: string
  bio?: 'string'
  image?: 'string'
}

export interface IUserError extends Partial<IUser> {
  'email or password'?: string
}

export type IUserFormData = Partial<IUser>

export type ISignInData = {
  email: string
  password: string
}

export type ISignUpData = {
  username: string
  email: string
  password: string
}
