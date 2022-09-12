import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../context/authContext'

interface PrivateRouteProps {
  element: JSX.Element
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
  const { user, loadingInitial } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && !loadingInitial) navigate('/sign-in')
  }, [user, loadingInitial])
  return element
}

export default PrivateRoute
