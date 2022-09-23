import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import Spinner from '../UI/spinner/spinner'
import PaginationByRouter from '../UI/pagination/paginationByRouter'
import ArticleShort from '../articleShort/articleShort'
import ErrorMessage from '../errorMessage/errorMessge'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getArticlesByPage, toggleFavoriteArticle } from '../../redux/slices/articlesSlice'
import { getArticlesList } from '../../redux/selectors/articleSelectors'

import styles from './articlesList.module.css'

const perPage = 5

function ArticlesList() {
  const { page } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { bySlug, allSlugs, status, articlesCount } = useAppSelector(getArticlesList)

  useEffect(() => {
    if (Number.isNaN(Number(page))) navigate('/not-found')
    const params = {
      offset: Number(page) * perPage - perPage,
      limit: perPage,
    }
    dispatch(getArticlesByPage(params))
  }, [page])

  const likeHandler = (slug: string) => dispatch(toggleFavoriteArticle({ slug, isFavorite: bySlug[slug].favorited }))

  if (status === 'error') {
    return <ErrorMessage button="Go back!">Failed to load articles! Try again later! :(</ErrorMessage>
  }

  if (allSlugs.length > 0 && articlesCount) {
    const totalCount = Math.ceil(articlesCount / perPage)

    if (Math.ceil(articlesCount / perPage) < Number(page)) {
      return <Navigate to="/404" replace />
    }

    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          {allSlugs.map((slug: string) => (
            <li key={slug} className={styles.list__item}>
              <ArticleShort article={bySlug[slug]} likeHandler={likeHandler} />
            </li>
          ))}
        </ul>
        <PaginationByRouter totalPages={totalCount} origin="/articles/" />
      </div>
    )
  }

  return <Spinner />
}

export default ArticlesList
