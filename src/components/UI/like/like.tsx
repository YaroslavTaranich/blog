import { FC, useState } from 'react'

import useAuth from '../../../context/authContext'
import ArticleService from '../../../services/ArticleServise'

import styles from './like.module.css'

interface LikeProps {
  likeHandler?: (slug: string) => void
  isFavorite?: boolean
  count: number
  slug: string
}

const Like: FC<LikeProps> = ({ count, likeHandler, isFavorite, slug }) => {
  const { user, loadingInitial } = useAuth()
  const [likeError, setLikeError] = useState(false)

  const classNames = [styles.like]

  if (user && isFavorite) {
    classNames.push(styles.liked)
  }
  if (!user && !loadingInitial) {
    classNames.push(styles.disabled)
  }

  const { likeArticle } = new ArticleService()

  const onClick = () => {
    if (user && !loadingInitial) {
      setLikeError(false)
      likeArticle(slug, isFavorite)
        .then(() => {
          if (likeHandler) likeHandler(slug)
        })
        .catch(() => {
          setLikeError(true)
        })
    }
  }

  return (
    <div className={classNames.join(' ')}>
      <button className={styles.button} type="button" onClick={onClick}>
        &nbsp;
      </button>

      <span className={styles.favorites}>{count}</span>
      {likeError && <div className={styles.error}>Error! can not like this :(</div>}
    </div>
  )
}

Like.defaultProps = {
  likeHandler: () => {},
  isFavorite: false,
}

export default Like
