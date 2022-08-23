import { FC } from 'react'

import styles from './button.module.scss'

interface ButtonProps {
  children: string
  onClick: () => void
  size?: 'sm' | 'md' | 'lg'

  submit?: boolean
  type?: 'primary' | 'danger' | 'success' | 'ghost' | 'black'
}

const Button: FC<ButtonProps> = ({ children, onClick, size = 'md', submit, type = 'primary' }) => {
  const buttonClasses = [styles.button, styles[size], styles[`button--${type}`]]

  return (
    <button className={buttonClasses.join(' ')} type={submit ? 'submit' : 'button'} onClick={onClick}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  size: 'md',
  submit: false,
  type: 'primary',
}

export default Button
