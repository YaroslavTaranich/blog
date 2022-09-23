import { FC, memo } from 'react'

import styles from './formTitle.module.css'

const FormTitle: FC<{ children: string }> = ({ children }) => <h1 className={styles.title}>{children}</h1>

export default memo(FormTitle)
