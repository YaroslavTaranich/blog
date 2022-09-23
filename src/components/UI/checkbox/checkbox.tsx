import { FC, memo } from 'react'
import { FieldError, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

import styles from './checkbox.module.scss'

interface CheckboxProps {
  name: string
  label: string
  register?: UseFormRegister<FieldValues> | null
  rules?: RegisterOptions
  error?: FieldError
}

const Checkbox: FC<CheckboxProps> = ({ name, label, rules, error, register, ...rest }) => {
  const htmlFor = `checkbox-${name}`
  return (
    <div>
      <label htmlFor={htmlFor} className={styles.check}>
        <input
          className={styles.check__input}
          type="checkbox"
          {...(register && register(name, rules))}
          {...rest}
          id={htmlFor}
        />
        <span className={styles.check__box} />
        <span className={styles.check__label}> {label}</span>
      </label>
      {error?.message && <p className={styles.error}>{error?.message}</p>}
    </div>
  )
}

Checkbox.defaultProps = {
  register: null,
  rules: undefined,
  error: undefined,
}

export default memo(Checkbox)
