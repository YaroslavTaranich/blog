import { Navigate } from 'react-router-dom'

import ArticleForm from '../components/articleForm/articleForm'
import ErrorMessage from '../components/errorMessage/errorMessge'
import Spinner from '../components/UI/spinner/spinner'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { IArticleFormData } from '../models/articles'
import { createNewArticle, getArticlesInfo, getCurrentArticle } from '../redux/slices/articlesSlice'
import { formatDataToPost } from '../utils/formatFromFormToFetch'

const defaultValues: IArticleFormData = {
  title: '',
  description: '',
  body: '',
  tagList: [],
}

const NewArticle = () => {
  const dispatch = useAppDispatch()
  const article = useAppSelector(getCurrentArticle)
  const { status } = useAppSelector(getArticlesInfo)

  const onSubmit = (data: IArticleFormData) => {
    dispatch(createNewArticle(formatDataToPost(data)))
  }

  if (status === 'loading') return <Spinner />

  if (status === 'error') return <ErrorMessage button="To articles">Opps.. Smoething went wrong! :(</ErrorMessage>

  if (status === 'created') return <Navigate to={`/articles/1/${article.slug}`} />

  return <ArticleForm title="Create new article" defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default NewArticle
