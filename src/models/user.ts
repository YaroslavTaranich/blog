export interface IUser {
  username: string
  email: string
  token: string
  bio?: 'string'
  image?: 'string'
}

export interface IUserError {
  username?: string
  email?: string
  message?: string
  error?: { [key: string]: string }
}

export interface IUserCreate {
  username: string
  email: string
  password: string
}

export interface IUserUpdate {
  username?: string
  email?: string
  token?: string
  bio?: 'string'
  image?: 'string'
}
