import { FC, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'

import UserInfo from '../userInfo/userInfo'
import TagList from '../UI/tagList/tagList'
import Like from '../like/like'
import { IArticle } from '../../models/articles'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { toggleFavoriteArticle } from '../../redux/slices/articlesSlice'

import styles from './articleShort.module.css'

interface ArticleShortProps {
  article: IArticle
}

const ArticleShort: FC<ArticleShortProps> = ({ article }) => {
  const dispatch = useAppDispatch()

  const { title, description, favoritesCount, author, tagList, createdAt, favorited, slug } = article

  const likeHandler = useCallback(() => dispatch(toggleFavoriteArticle({ slug, isFavorite: favorited })), [])

  return (
    <>
      <header className={styles.header}>
        <Link to={`${slug}`} className={styles.title}>
          {title}
        </Link>
        <Like count={favoritesCount} isFavorite={favorited} likeHandler={likeHandler} />
      </header>
      <TagList tags={tagList} />
      <div className={styles.description}>{description}</div>
      <div className={styles.author}>
        <UserInfo user={author} createdAt={createdAt} />
      </div>
    </>
  )
}

export default memo(ArticleShort)
