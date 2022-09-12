/* eslint-disable class-methods-use-this */

import { AxiosError } from 'axios'

import { IUser } from '../models/user'
import { IUserResponse, ServerErrorResponse } from '../models/responnse'

import authHeader from './authHeader'
import axios from './axios'

export default class UserServise {
  loginUser = async (email: string, password: string): Promise<IUser> => {
    const user = await axios
      .post<IUserResponse>('users/login', { user: { email, password } })
      .then((res) => res.data.user)
      .catch((error: AxiosError<ServerErrorResponse>) => {
        throw error
      })
    return user
  }

  createUser = async (username: string, email: string, password: string): Promise<IUser> => {
    const user = await axios
      .post<IUserResponse>('users', { user: { username, email, password } })
      .then((res) => res.data.user)
      .catch((error: AxiosError<ServerErrorResponse>) => {
        throw error
      })

    return user
  }

  getCurrentUser = async (): Promise<IUser> => {
    const user = await axios
      .get<IUserResponse>('user', { ...authHeader() })
      .then((res) => res.data.user)
      .catch((error: AxiosError<ServerErrorResponse>) => {
        throw error
      })

    return user
  }

  editCurrentUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = await axios
      .put<IUserResponse>('user', { user: { ...userData } }, { ...authHeader() })
      .then((res) => res.data.user)
      .catch((error: AxiosError<ServerErrorResponse>) => {
        throw error
      })

    return user
  }
}
