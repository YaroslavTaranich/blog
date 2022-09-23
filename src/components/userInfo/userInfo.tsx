import { FC, memo } from 'react'
import { format } from 'date-fns'

import { IAuthtor } from '../../models/articles'
import { IUser } from '../../models/user'
import avatar from '../../assets/img/avatar.svg'

import styles from './userInfo.module.css'

interface UserInfoProps {
  user: IAuthtor | IUser
  createdAt?: Date | undefined
}

const UserInfo: FC<UserInfoProps> = ({ user, createdAt }) => (
  <div className={styles.user}>
    <div className={styles.user__name}>{user.username}</div>
    {createdAt && <div className={styles.user__created}>{format(new Date(createdAt), 'PPP')}</div>}
    <img className={styles.user__avatar} src={user.image || avatar} alt={`${user.username}'s avatar`} />
  </div>
)

UserInfo.defaultProps = {
  createdAt: undefined,
}

export default memo(UserInfo)
