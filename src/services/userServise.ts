/* eslint-disable class-methods-use-this */

import { IUser } from '../models/user'
import { IUserResponse } from '../models/responnse'
import setAuthFromLocalToken from '../utils/setAuthFromLocalToken'

import axios from './axios'

export default class UserServise {
  loginUser = async (email: string, password: string): Promise<IUser> => {
    const user = await axios
      .post<IUserResponse>('users/login', { user: { email, password } })
      .then((res) => res.data.user)
    return user
  }

  createUser = async (username: string, email: string, password: string): Promise<IUser> => {
    const user = await axios
      .post<IUserResponse>('users', { user: { username, email, password } })
      .then((res) => res.data.user)
    return user
  }

  getCurrentUser = async (): Promise<IUser> => {
    const user = await axios.get<IUserResponse>('user', { ...setAuthFromLocalToken() }).then((res) => res.data.user)
    return user
  }

  editCurrentUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = await axios
      .put<IUserResponse>('user', { user: { ...userData } }, { ...setAuthFromLocalToken() })
      .then((res) => res.data.user)
    return user
  }
}
