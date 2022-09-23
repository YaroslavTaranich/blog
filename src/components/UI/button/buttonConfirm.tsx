import { KeyboardEvent, memo, useEffect, useRef } from 'react'

import styles from './button.module.scss'

interface ButtonConfirmProps {
  show: boolean
  yes?: () => void
  no: () => void
  label: string
}

function ButtonConfirm({ show, yes, no, label }: ButtonConfirmProps) {
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const yesButtonRef = useRef<HTMLButtonElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const confirmClasses = [styles.confirm]
  if (show) confirmClasses.push(styles.show)

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        noButtonRef.current?.focus()
      }, 50)
    }
  }, [show])

  const blurHandler = () => {
    setTimeout(() => {
      if (
        document.activeElement === noButtonRef.current ||
        document.activeElement === yesButtonRef.current ||
        document.activeElement === wrapperRef.current
      ) {
        return
      }
      no()
    })
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') no()
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={confirmClasses.join(' ')}
      onBlur={blurHandler}
      onKeyDown={keyDownHandler}
      ref={wrapperRef}
      tabIndex={-1}
    >
      <p className={styles.confirm__text}>Are you sure to {label} this article?</p>
      <div className={styles.confirm__buttons}>
        <button className={styles.no} type="button" onClick={no} ref={noButtonRef}>
          No
        </button>
        <button className={styles.yes} type="button" onClick={yes} ref={yesButtonRef}>
          Yes
        </button>
      </div>
    </div>
  )
}

ButtonConfirm.defaultProps = {
  yes: () => {},
}

export default memo(ButtonConfirm)
