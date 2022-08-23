import { useState, useEffect } from 'react'

import BlogService from '../../services/blogServise'
import { IArticle } from '../../models/articles'
import Spinner from '../UI/spinner/spinner'
import Pagination from '../UI/pagination/pagination'
import ArticleShort from '../articleShort/articleShort'

import styles from './articlesList.module.css'

function ArticlesList() {
  const [offset, setOffset] = useState(0)
  const service = new BlogService()

  const [articles, setArticles] = useState<IArticle[]>([])
  const [articlesCount, setArticlesCount] = useState<number>(0)
  const [status, setStatus] = useState<'loading' | 'error' | 'ok'>('ok')

  useEffect(() => {
    setStatus('loading')
    service
      .getArticles(offset)
      .then((data) => {
        setArticles(data.articles)
        setArticlesCount(data.articlesCount)
        setStatus('ok')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [offset])

  if (status === 'error') {
    return <h2> error !!!!!</h2>
  }

  if (status === 'loading') {
    return <Spinner />
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
      <Pagination perPage={5} currentOffset={offset} setOffset={setOffset} totalCount={articlesCount} />
    </div>
  )
}

export default ArticlesList
