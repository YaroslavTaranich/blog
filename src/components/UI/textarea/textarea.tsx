import { TextareaHTMLAttributes } from 'react'
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

import styles from './textarea.module.css'

interface TextareaProps<T extends FieldValues> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>
  label?: string
  register?: UseFormRegister<T> | null
  rules?: RegisterOptions
  error?: FieldError | undefined
}

const Textarea = <T extends Record<string, unknown>>({
  name,
  label,
  rules,
  error,
  register,
  ...rest
}: TextareaProps<T>) => {
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
      <textarea className={styles.textarea} {...(register && register(name, rules))} {...rest} id={name} />
      {error?.message && <p className={styles.error}>{error?.message}</p>}
    </div>
  )
}

Textarea.defaultProps = {
  register: null,
  rules: undefined,
  error: undefined,
  label: undefined,
}

export default Textarea
