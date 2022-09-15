import { AxiosError } from 'axios'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import ArticleForm from '../components/articleForm/articleForm'
import ErrorMessage from '../components/errorMessage/errorMessge'
import Spinner from '../components/UI/spinner/spinner'
import useAuth from '../context/authContext'
import useFetch from '../hooks/useFetching'
import { IArticle, IArticleFormData, IArticlePostData } from '../models/articles'
import ArticleService from '../services/ArticleServise'
import { formatDataToPost, formatFetchedToData } from '../utils/formatFromFormToFetch'

const articleServise = new ArticleService()

const EditArticle = () => {
  const params = useParams()

  const { user, loadingInitial } = useAuth()
  const [data, status] = useFetch<{ article: IArticle }>(`/articles/${params.slug}`)

  const [updatedArticle, setUpdatedArticle] = useState<IArticle | null>(null)
  const [updateError, setUpdateError] = useState<AxiosError>()

  const onSubmit = (submitingData: IArticleFormData) => {
    articleServise
      .editArticle(params.slug, formatDataToPost(submitingData))
      .then((res) => {
        setUpdatedArticle(res)
      })
      .catch((e) => setUpdateError(e))
  }

  if (user && !loadingInitial && data && data.article.author.username !== user.username) {
    return <ErrorMessage button="go back">You can edit only your one articles</ErrorMessage>
  }

  if (updateError || status === 'error') return <ErrorMessage button="To articles">Opps..</ErrorMessage>

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
