import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import Spinner from '../UI/spinner/spinner'
import PaginationByRouter from '../UI/pagination/paginationByRouter'
import ArticleShort from '../articleShort/articleShort'
import ErrorMessage from '../errorMessage/errorMessge'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getArticlesByPage, artcilesSelectors, getArticlesInfo } from '../../redux/slices/articlesSlice'

import styles from './articlesList.module.css'

const perPage = 5

function ArticlesList() {
  const { page } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const articles = useAppSelector(artcilesSelectors.selectAll)
  const { status, articlesCount } = useAppSelector(getArticlesInfo)

  useEffect(() => {
    if (Number.isNaN(Number(page))) navigate('/not-found')
    const params = {
      offset: Number(page) * perPage - perPage,
      limit: perPage,
    }
    dispatch(getArticlesByPage(params))
  }, [page])

  if (status === 'error') {
    return <ErrorMessage button="Go back!">Failed to load articles! Try again later! :(</ErrorMessage>
  }

  if (status === 'loading') return <Spinner />

  if (articles.length > 0 && articlesCount && Math.ceil(articlesCount / perPage) < Number(page)) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className={styles.container}>
      {articles.length > 0 && articlesCount && (
        <>
          <ul className={styles.list}>
            {articles.map((article) => (
              <li key={article.slug} className={styles.list__item}>
                <ArticleShort article={article} />
              </li>
            ))}
          </ul>
          <PaginationByRouter totalPages={Math.ceil(articlesCount / perPage)} origin="/articles/" />
        </>
      )}
    </div>
  )
}

export default ArticlesList
