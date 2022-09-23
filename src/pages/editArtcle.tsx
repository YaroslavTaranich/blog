import { Navigate, useParams } from 'react-router-dom'

import ArticleForm from '../components/articleForm/articleForm'
import ErrorMessage from '../components/errorMessage/errorMessge'
import Spinner from '../components/UI/spinner/spinner'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { IArticleFormData, IArticlePostData } from '../models/articles'
import { getCurrentArticle } from '../redux/selectors/articleSelectors'
import getUserData from '../redux/selectors/userSelector'
import { updateArticle } from '../redux/slices/articlesSlice'
import { formatDataToPost, formatFetchedToData } from '../utils/formatFromFormToFetch'

const EditArticle = () => {
  const params = useParams()
  const dispatch = useAppDispatch()

  const { article, status } = useAppSelector(getCurrentArticle)

  const { info, loadingInitial } = useAppSelector(getUserData)

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

  if (status === 'error') return <ErrorMessage button="To articles">Opps..</ErrorMessage>

  if (status === 'updated') return <Navigate to={`/articles/1/${article.slug}`} />

  if (article) {
    const defaultValues: IArticlePostData = {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    }
    return <ArticleForm title="Edit article" defaultValues={formatFetchedToData(defaultValues)} onSubmit={onSubmit} />
  }

  return <Spinner />
}

export default EditArticle
