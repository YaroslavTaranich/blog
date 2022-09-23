import { InputHTMLAttributes } from 'react'
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

import styles from './input.module.css'

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  label?: string
  register?: UseFormRegister<T> | null
  rules?: RegisterOptions
  error?: FieldError | undefined
}

const Input = <T extends Record<string, unknown>>({ name, label, rules, error, register, ...rest }: InputProps<T>) => {
  const labelClasess = [styles.container]
  if (error) {
    labelClasess.push(styles.invalid)
  }

  return (
    <div className={labelClasess.join(' ')}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input className={styles.input} {...(register && register(name, rules))} {...rest} id={name} />
      {error?.message && <p className={styles.error}>{error?.message}</p>}
    </div>
  )
}

Input.defaultProps = {
  register: null,
  rules: undefined,
  error: undefined,
  label: undefined,
}

export default Input
