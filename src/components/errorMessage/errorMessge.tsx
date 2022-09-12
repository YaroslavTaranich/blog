import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../UI/button/button'

import styles from './errorMessage.module.css'

interface ErrorMessageProps {
  children: string
  button: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children, button }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Something went wrong :(</h2>
      {children && <p className={styles.message}>Status: {children}</p>}
      <p className={styles.message}>Try again later!</p>
      {button && (
        <Button
          type="danger"
          onClick={() => {
            navigate(-1)
          }}
        >
          {button}
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage
