import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../hooks/reduxHooks'
import { getUserData } from '../../redux/slices/userSlice'

interface PrivateRouteProps {
  element: JSX.Element
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
  const { info, loadingInitial } = useAppSelector(getUserData)
  const navigate = useNavigate()

  useEffect(() => {
    if (!info && !loadingInitial) navigate('/sign-in')
  }, [info, loadingInitial])
  return element
}

export default PrivateRoute
