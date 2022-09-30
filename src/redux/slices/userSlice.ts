/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, CaseReducer, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { FetchStatus, UserStatus } from '../../models/enums'
import { ServerErrorResponse } from '../../models/responnse'
import { ISignInData, ISignUpData, IUser, IUserError } from '../../models/user'
import UserServise from '../../services/userServise'
import type { RootState } from '../store'

const { loginUser, createUser, getCurrentUser, editCurrentUser } = new UserServise()

type UserState = {
  info: IUser | null
  fetchStatus: FetchStatus
  userStatus: UserStatus
  loadingInitial: boolean
  error: any
}

const initialState: UserState = {
  info: null,
  fetchStatus: FetchStatus.loading,
  userStatus: UserStatus.idle,
  loadingInitial: true,
  error: null,
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
  return null
})

export const updateProfile = createAsyncThunk('user/updateProfile', (userData: Partial<IUser>, { rejectWithValue }) =>
  editCurrentUser(userData)
    .then((user) => user)
    .catch((error: AxiosError<ServerErrorResponse>) => rejectWithValue(error.response?.data.errors))
)

const loadingUser: CaseReducer<UserState> = (state) => ({ ...state, fetchStatus: FetchStatus.loading })

const storeUser: CaseReducer<UserState, PayloadAction<IUser>> = (state, action) => {
  localStorage.setItem('token', action.payload.token)
  return {
    ...state,
    fetchStatus: FetchStatus.success,
    userStatus: UserStatus.idle,
    info: action.payload,
    error: null,
  }
}

const updateUser: CaseReducer<UserState, PayloadAction<IUser>> = (state, action) => {
  localStorage.setItem('token', action.payload.token)
  return {
    ...state,
    fetchStatus: FetchStatus.success,
    userStatus: UserStatus.update,
    info: action.payload,
    error: null,
  }
}

const errorUser: CaseReducer<UserState, PayloadAction<unknown>> = (state, action) => ({
  ...state,
  fetchStatus: FetchStatus.success,
  userStatus: UserStatus.idle,
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
      fetchStatus: FetchStatus.success,
      userStatus: UserStatus.idle,
      error: null,
    }),
    clearError: (state) => ({
      ...state,
      fetchStatus: FetchStatus.idle,
      userStatus: UserStatus.idle,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, loadingUser)
    builder.addCase(signIn.fulfilled, storeUser)
    builder.addCase(signIn.rejected, errorUser)

    builder.addCase(signUp.pending, loadingUser)
    builder.addCase(signUp.fulfilled, storeUser)
    builder.addCase(signUp.rejected, errorUser)

    builder.addCase(initUser.pending, (state) => {
      state.loadingInitial = true
    })

    builder.addCase(initUser.fulfilled, (state, action) => {
      state.info = action.payload as IUser | null
      state.loadingInitial = false
    })
    builder.addCase(initUser.rejected, (state) => {
      state.loadingInitial = false
    })

    builder.addCase(updateProfile.pending, loadingUser)
    builder.addCase(updateProfile.fulfilled, updateUser)
    builder.addCase(updateProfile.rejected, errorUser)
  },
})

export const { logOut, setSuccess, clearError } = userSlice.actions

export default userSlice.reducer

const getUser = (state: RootState) => state.user

export const getUserData = createSelector(getUser, (user) => user)
