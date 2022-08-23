import { FC } from 'react'
import { Link } from 'react-router-dom'

import UserInfo from '../userInfo/userInfo'
import TagList from '../tagList/tagList'
import Like from '../UI/like/like'
import { IArticle } from '../../models/articles'

import styles from './articleShort.module.css'

interface ArticleShortProps {
  article: IArticle
}

const ArticleShort: FC<ArticleShortProps> = ({ article }) => {
  const { title, description, favoritesCount, author, tagList, createdAt } = article

  return (
    <>
      <header className={styles.header}>
        <Link to={`${article.slug}`} className={styles.title}>
          {title}
        </Link>
        <Like count={favoritesCount} />
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
