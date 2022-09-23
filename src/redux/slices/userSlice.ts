/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ServerErrorResponse } from '../../models/responnse'
import { StatusType } from '../../models/status'
import { ISignInData, ISignUpData, IUser, IUserError } from '../../models/user'
import UserServise from '../../services/userServise'

const { loginUser, createUser, getCurrentUser, editCurrentUser } = new UserServise()

type UserState = {
  info: IUser | undefined
  status: StatusType
  loadingInitial: boolean
  error: any | undefined
}

const initialState: UserState = {
  info: undefined,
  status: undefined,
  loadingInitial: true,
  error: undefined,
}

export const signIn = createAsyncThunk('user/signIn', async ({ email, password }: ISignInData, { rejectWithValue }) =>
  loginUser(email, password)
    .then((user) => user)
    .catch((error: AxiosError<ServerErrorResponse>) => rejectWithValue(error.response?.data.errors as IUserError))
)

export const signUp = createAsyncThunk(
  'user/signUpUser',
  async ({ username, email, password }: ISignUpData, { rejectWithValue }) =>
    createUser(username, email, password)
      .then((user) => user)
      .catch((error: AxiosError<ServerErrorResponse>) => rejectWithValue(error.response?.data.errors))
)

export const initUser = createAsyncThunk('user/initialUser', async (params, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return getCurrentUser()
      .then((user) => user)
      .catch((error: AxiosError<ServerErrorResponse>) => {
        localStorage.removeItem('token')
        rejectWithValue(error.response?.data.errors)
      })
  }
  return undefined
})

export const updateProfile = createAsyncThunk('user/updateProfile', (userData: Partial<IUser>, { rejectWithValue }) =>
  editCurrentUser(userData)
    .then((user) => user)
    .catch((error: AxiosError<ServerErrorResponse>) => rejectWithValue(error.response?.data.errors))
)

const loadingUser: CaseReducer<UserState> = (state) => ({ ...state, status: 'loading' })

const storeUser: CaseReducer<UserState, PayloadAction<IUser>> = (state, action) => {
  localStorage.setItem('token', action.payload.token)
  return {
    ...state,
    status: 'success',
    info: action.payload,
    error: undefined,
  }
}

const updateUser: CaseReducer<UserState, PayloadAction<IUser>> = (state, action) => {
  localStorage.setItem('token', action.payload.token)
  return {
    ...state,
    status: 'updated',
    info: action.payload,
    error: undefined,
  }
}

const errorUser: CaseReducer<UserState, PayloadAction<unknown>> = (state, action) => ({
  ...state,
  status: 'error',
  error: action.payload as IUserError,
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem('token')
      return {
        ...initialState,
        loadingInitial: false,
      }
    },
    setSuccess: (state) => ({
      ...state,
      status: 'success',
    }),
    clearError: (state) => ({
      ...state,
      status: undefined,
      error: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, loadingUser)
    builder.addCase(signIn.fulfilled, storeUser)
    builder.addCase(signIn.rejected, errorUser)

    builder.addCase(signUp.pending, loadingUser)
    builder.addCase(signUp.fulfilled, storeUser)
    builder.addCase(signUp.rejected, errorUser)

    builder.addCase(initUser.pending, (state) => ({ ...state, loadingInitial: true }))

    builder.addCase(initUser.fulfilled, (state, action) => ({
      ...state,
      info: action.payload as IUser | undefined,
      loadingInitial: false,
    }))
    builder.addCase(initUser.rejected, (state) => ({ ...state, loadingInitial: false }))

    builder.addCase(updateProfile.pending, loadingUser)
    builder.addCase(updateProfile.fulfilled, updateUser)
    builder.addCase(updateProfile.rejected, errorUser)
  },
})

export const { logOut, setSuccess, clearError } = userSlice.actions

export default userSlice.reducer
