import { FC, memo } from 'react'

import { useAppSelector } from '../../hooks/reduxHooks'
import { getUserData } from '../../redux/slices/userSlice'
// import ArticleService from '../../services/ArticleServise'

import styles from './like.module.css'

interface LikeProps {
  likeHandler: () => void
  isFavorite: boolean
  count: number
}

const Like: FC<LikeProps> = ({ count, likeHandler, isFavorite }) => {
  const { info, loadingInitial } = useAppSelector(getUserData)

  const classNames = [styles.like]

  if (info && isFavorite) {
    classNames.push(styles.liked)
  }
  if (!info && !loadingInitial) {
    classNames.push(styles.disabled)
  }

  return (
    <div className={classNames.join(' ')}>
      <button className={styles.button} type="button" onClick={likeHandler}>
        &nbsp;
      </button>

      <span className={styles.favorites}>{count}</span>
    </div>
  )
}

export default memo(Like)
