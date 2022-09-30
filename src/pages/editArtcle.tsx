import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import ArticleForm from '../components/articleForm/articleForm'
import ErrorMessage from '../components/errorMessage/errorMessge'
import Spinner from '../components/UI/spinner/spinner'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { IArticleFormData, IArticlePostData } from '../models/articles'
import { ArticleStatus, FetchStatus } from '../models/enums'
import { getArticleBySlug, updateArticle, getCurrentArticle, getArticlesInfo } from '../redux/slices/articlesSlice'
import { getUserData } from '../redux/slices/userSlice'
import { formatDataToPost, formatFetchedToData } from '../utils/formatFromFormToFetch'

const EditArticle = () => {
  const params = useParams()
  const dispatch = useAppDispatch()

  const article = useAppSelector(getCurrentArticle)
  const { fetchStatus, articleStatus } = useAppSelector(getArticlesInfo)

  const { info, loadingInitial } = useAppSelector(getUserData)

  useEffect(() => {
    if (params.slug) dispatch(getArticleBySlug(params.slug))
  }, [])

  const onSubmit = (submitingData: IArticleFormData) => {
    const updateData = {
      slug: params.slug as string,
      body: formatDataToPost(submitingData),
    }
    dispatch(updateArticle(updateData))
  }

  if (info && !loadingInitial && article && article.author.username !== info.username) {
    return <ErrorMessage button="go back">You can edit only your one articles</ErrorMessage>
  }

  if (
    (fetchStatus === FetchStatus.success && articleStatus === ArticleStatus.update) ||
    (!article && fetchStatus === FetchStatus.success)
  )
    return <Navigate to={`/articles/1/${params.slug}`} />

  if (fetchStatus === FetchStatus.error) return <ErrorMessage button="To articles">Opps..</ErrorMessage>

  if (fetchStatus === FetchStatus.loading || loadingInitial) return <Spinner />

  const defaultValues: IArticlePostData = {
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList,
  }
  return <ArticleForm title="Edit article" defaultValues={formatFetchedToData(defaultValues)} onSubmit={onSubmit} />
}

export default EditArticle
