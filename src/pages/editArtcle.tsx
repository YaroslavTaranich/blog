import { AxiosError } from 'axios'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import ArticleForm, { formatDataToPost, formatFetchedToData } from '../components/articleForm/articleForm'
import ErrorMessage from '../components/errorMessage/errorMessge'
import Spinner from '../components/UI/spinner/spinner'
import useFetch from '../hooks/useFetching'
import { IArticle, IArticleFormData, IArticlePostData } from '../models/articles'
import ArticleService from '../services/ArticleServise'

const articleServise = new ArticleService()

const EditArticle = () => {
  const params = useParams()

  const [data, status] = useFetch<{ article: IArticle }>(`/articles/${params.slug}`)

  const [updatedArticle, setUpdatedArticle] = useState<IArticle | null>(null)
  const [error, setError] = useState<AxiosError>()

  const onSubmit = (submitingData: IArticleFormData) => {
    articleServise
      .editArticle(params.slug, formatDataToPost(submitingData))
      .then((res) => {
        setUpdatedArticle(res)
      })
      .catch((e) => setError(e))
  }

  if (error || status === 'error') return <ErrorMessage button="To articles">Opps..</ErrorMessage>

  if (updatedArticle) return <Navigate to={`/articles/1/${updatedArticle.slug}`} />

  if (data) {
    const defaultValues: IArticlePostData = {
      title: data.article.title,
      description: data.article.description,
      body: data.article.body,
      tagList: data.article.tagList,
    }
    return <ArticleForm title="Edit article" defaultValues={formatFetchedToData(defaultValues)} onSubmit={onSubmit} />
  }

  return <Spinner />
}

export default EditArticle
