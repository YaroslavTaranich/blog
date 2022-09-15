import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import useAuth from '../../context/authContext'
import useFetch from '../../hooks/useFetching'
import { IArticle } from '../../models/articles'
import ErrorMessage from '../errorMessage/errorMessge'
import TagList from '../UI/tagList/tagList'
import Like from '../UI/like/like'
import Spinner from '../UI/spinner/spinner'
import UserInfo from '../userInfo/userInfo'

import styles from './article.module.css'
import ArtileControls from './articleControls'

function Article() {
  const params = useParams()

  const { user, loadingInitial } = useAuth()

  const [data, status, errorMessage, setData] = useFetch<{ article: IArticle }>(`/articles/${params.slug}`)

  const likeHandler = () => {
    setData((oldData) => {
      if (oldData) {
        const {
          article: { favorited, favoritesCount },
        } = oldData
        return {
          article: {
            ...oldData.article,
            favorited: !favorited,
            favoritesCount: favorited ? favoritesCount - 1 : favoritesCount + 1,
          },
        }
      }
      return oldData
    })
  }

  if (status === 'error') {
    return <ErrorMessage button="Go back">{errorMessage}</ErrorMessage>
  }

  if (data) {
    const {
      article: { title, favoritesCount, author, createdAt, tagList, description, body, favorited, slug },
    } = data
    return (
      <article className={styles.article}>
        <header className={styles.header}>
          <h5 className={styles.title}>{title}</h5>
          <Like count={favoritesCount} isFavorite={favorited} likeHandler={likeHandler} slug={slug} />
          <div className={styles.authtor}>
            <UserInfo user={author} createdAt={createdAt} />
          </div>
          {user && !loadingInitial && data && user.username === data.article.author.username && <ArtileControls />}
        </header>
        <TagList tags={tagList} />
        <p className={styles.shortText}>{description}</p>
        <section className={styles.markdown}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </section>
      </article>
    )
  }
  return <Spinner />
}

export default Article
