import { AxiosError } from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import ArticleForm from '../components/articleForm/articleForm'
import ErrorMessage from '../components/errorMessage/errorMessge'
import Spinner from '../components/UI/spinner/spinner'
import { IArticle, IArticleFormData } from '../models/articles'
import ArticleService from '../services/ArticleServise'
import { formatDataToPost } from '../utils/formatFromFormToFetch'

const defaultValues: IArticleFormData = {
  title: '',
  description: '',
  body: '',
  tagList: [],
}

const articleServise = new ArticleService()

const NewArticle = () => {
  const [article, setArticle] = useState<IArticle | null>(null)
  const [error, setError] = useState<AxiosError>()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = (data: IArticleFormData) => {
    setLoading(true)
    articleServise
      .postArticle(formatDataToPost(data))
      .then((res) => {
        setArticle(res)
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }

  if (loading) return <Spinner />

  if (error) return <ErrorMessage button="To articles">Opps..</ErrorMessage>

  if (article) return <Navigate to={`/articles/1/${article.slug}`} />

  return <ArticleForm title="Create new article" defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default NewArticle
