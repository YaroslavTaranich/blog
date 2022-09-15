import { FC } from 'react'
import { Link } from 'react-router-dom'

import UserInfo from '../userInfo/userInfo'
import TagList from '../tagList/tagList'
import Like from '../UI/like/like'
import { IArticle } from '../../models/articles'

import styles from './articleShort.module.css'

interface ArticleShortProps {
  article: IArticle
  likeHandler: (slug: string) => void
}

const ArticleShort: FC<ArticleShortProps> = ({ article, likeHandler }) => {
  const { title, description, favoritesCount, author, tagList, createdAt, favorited, slug } = article

  return (
    <>
      <header className={styles.header}>
        <Link to={`${slug}`} className={styles.title}>
          {title}
        </Link>
        <Like count={favoritesCount} isFavorite={favorited} slug={slug} likeHandler={likeHandler} />
      </header>
      <TagList tags={tagList} />
      <div className={styles.description}>{description}</div>
      <div className={styles.author}>
        <UserInfo user={author} createdAt={createdAt} />
      </div>
    </>
  )
}

export default ArticleShort
