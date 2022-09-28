import { FC, memo, useEffect, useState } from 'react'

import styles from './button.module.scss'
import ButtonConfirm from './buttonConfirm'

interface ButtonProps {
  children: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  submit?: boolean
  type?: 'primary' | 'danger' | 'success' | 'ghost' | 'black' | 'outline'
  loading?: boolean
}

const ButtonLoader = () => (
  <div className={styles.loader_spinner}>
    <div className={styles.loader}>
      <div />
    </div>
  </div>
)

const Button: FC<ButtonProps> = ({ children, onClick, size = 'md', submit, type = 'primary', loading = false }) => {
  const buttonClasses = [styles.button, styles[size], styles[`button--${type}`]]

  return (
    <button
      className={buttonClasses.join(' ')}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <ButtonLoader /> : children}
    </button>
  )
}

export const ButtonWithConfirm: FC<ButtonProps> = (props) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const { children, onClick, loading } = props

  useEffect(() => {
    if (loading) setShowConfirm(false)
  }, [loading])

  return (
    <div className={styles.wrapper}>
      <Button {...props} onClick={() => !loading && setShowConfirm(true)}>
        {children}
      </Button>

      <ButtonConfirm
        show={showConfirm}
        yes={onClick}
        no={() => setShowConfirm(false)}
        label={children.toLocaleLowerCase()}
      />
    </div>
  )
}

Button.defaultProps = {
  loading: false,
  size: 'md',
  submit: false,
  type: 'primary',
  onClick: () => {},
}
ButtonWithConfirm.defaultProps = Button.defaultProps

export default memo(Button)
