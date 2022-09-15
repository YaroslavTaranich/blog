import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { IUser } from '../models/user'
import UserServise from '../services/userServise'

interface AuthContextType {
  user?: IUser
  loading: boolean
  loadingInitial: boolean
  error?: any
  login: (email: string, password: string) => void
  createUser: (email: string, name: string, password: string) => void
  logout: () => void
  updateUser: (data: Partial<IUser>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<IUser>()
  const [error, setError] = useState<Error | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true)

  const navigate = useNavigate()
  const location = useLocation()
  const userServise = new UserServise()

  useEffect(() => {
    if (error) setError(null)
  }, [location.pathname])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoadingInitial(false)
      return
    }
    userServise
      .getCurrentUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => {
        setUser(undefined)
      })
      .finally(() => setLoadingInitial(false))
  }, [])

  function login(email: string, password: string) {
    setLoading(true)
    setError(undefined)

    userServise
      .loginUser(email, password)
      .then((currentUser) => {
        setUser(currentUser)
        localStorage.setItem('token', currentUser.token)
        navigate('/')
      })
      .catch((e) => {
        const { errors } = e.response.data
        setError(errors)
      })
      .finally(() => setLoading(false))
  }

  function createUser(username: string, email: string, password: string) {
    setLoading(true)
    setError(undefined)

    userServise
      .createUser(username, email, password)
      .then((currentUser) => {
        setUser(currentUser)
        localStorage.setItem('token', currentUser.token)
        navigate('/')
      })
      .catch((e) => {
        const { errors } = e.response.data
        setError(errors)
      })
      .finally(() => setLoading(false))
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(undefined)
  }

  function updateUser(userData: Partial<IUser>) {
    setLoading(true)
    setError(undefined)

    return userServise
      .editCurrentUser(userData)
      .then((currentUser) => {
        setUser(currentUser)
        return true
      })
      .catch((e) => {
        const { errors } = e.response.data
        setError(errors)
        return false
      })
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      loadingInitial,
      error,
      login,
      createUser,
      logout,
      updateUser,
    }),
    [user, loading, error, loadingInitial]
  )

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
