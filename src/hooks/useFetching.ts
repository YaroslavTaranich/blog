import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

import axios from '../services/axios'

type StatusType = 'resolved' | 'loading' | 'error'

export default function useFetch<T>(
  url: string,
  params: AxiosRequestConfig = {}
): [data: T, status: StatusType, errorMessage: string] {
  const [data, setData] = useState<T>()
  const [status, setStatus] = useState<StatusType>('resolved')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setStatus('loading')
    axios
      .get<AxiosResponse>(url, params)
      .then((res: AxiosResponse) => {
        setData(res.data as T)
        setStatus('resolved')
      })
      .catch((error: AxiosError) => {
        setStatus('error')
        setErrorMessage(error.message)
      })
  }, [url])

  return [data as T, status, errorMessage]
}
