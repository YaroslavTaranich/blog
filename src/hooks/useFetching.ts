import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useMemo, useState } from 'react'

import authHeader from '../services/authHeader'
import axios from '../services/axios'

type StatusType = 'resolved' | 'loading' | 'error'

export default function useFetch<T>(
  url: string,
  config: AxiosRequestConfig | undefined = undefined
): [data: T, status: StatusType, errorMessage: string] {
  const [data, setData] = useState<T>()
  const [status, setStatus] = useState<StatusType>('resolved')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [data])

  const auth = useMemo(() => authHeader(), [token])

  useEffect(() => {
    setStatus('loading')
    axios
      .get<AxiosResponse>(url, { ...config, ...auth })
      .then((res: AxiosResponse) => {
        setData(res.data as T)
        setStatus('resolved')
      })
      .catch((error: AxiosError) => {
        setStatus('error')
        setErrorMessage(error.message)
      })
  }, [url, config])

  return [data as T, status, errorMessage]
}
