import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import useFetch from '../../hooks/useFetching'
import { IArticle } from '../../models/articles'
import Spinner from '../UI/spinner/spinner'
import Pagination from '../UI/pagination/pagination'
import ArticleShort from '../articleShort/articleShort'

import styles from './articlesList.module.css'

const perPage = 5

interface ArticlesListFetch {
  articles: IArticle[]
  articlesCount: number
}

function ArticlesList() {
  const { page } = useParams()

  const fetchConfg = useMemo(
    () => ({
      params: {
        offset: Number(page) * perPage - perPage,
        limit: perPage,
      },
    }),
    [page]
  )

  const [data, status, errorMessage] = useFetch<ArticlesListFetch>('/articles', fetchConfg)

  if (status === 'loading') {
    return <Spinner />
  }

  if (status === 'error') {
    return <h2> {errorMessage}</h2>
  }

  if (data) {
    const { articlesCount, articles } = data

    const totalCount = Math.ceil(articlesCount / perPage)

    if (Math.ceil(articlesCount / perPage) < Number(page)) {
      return <Navigate to="/404" replace />
    }

    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          {articles.map((a) => (
            <li key={a.slug} className={styles.list__item}>
              <ArticleShort article={a} />
            </li>
          ))}
        </ul>
        <Pagination totalPages={totalCount} origin="/articles/" />
      </div>
    )
  }

  return <div> ERORRR!!!!!</div>
}

export default ArticlesList
