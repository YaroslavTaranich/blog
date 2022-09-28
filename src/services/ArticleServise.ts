/* eslint-disable class-methods-use-this */
import { IArticlePostData, IArticle } from '../models/articles'
import { IArticlesResponce, IArticleResponce } from '../models/responnse'
import setAuthFromLocalToken from '../utils/setAuthFromLocalToken'

import axios from './axios'

export default class ArticleService {
  getArticles = async (offset = 0, limit = 5): Promise<IArticlesResponce> => {
    const articles = await axios
      .get('articles', { params: { offset, limit }, ...setAuthFromLocalToken() })
      .then<IArticlesResponce>((res) => res.data)
    return articles
  }

  getArticle = async (slug: string): Promise<IArticle> => {
    const article = await axios
      .get<IArticleResponce>(`articles/${slug}`, { ...setAuthFromLocalToken() })
      .then((res) => res.data.article)
    return article
  }

  postArticle = async (body: IArticlePostData): Promise<IArticle> => {
    const article = await axios
      .post('articles/', { article: body }, { ...setAuthFromLocalToken() })
      .then((res) => res.data.article)
    return article
  }

  editArticle = async (slug: string | undefined, body: IArticlePostData): Promise<IArticle> => {
    const article = await axios
      .put(`articles/${slug}`, { article: body }, { ...setAuthFromLocalToken() })
      .then((res) => res.data.article)
    return article
  }

  deleteArticle = async (slug: string): Promise<boolean> => {
    await axios.delete(`articles/${slug}`, { ...setAuthFromLocalToken() })
    return true
  }

  likeArticle = async (slug: string | undefined, isFavorite: boolean | undefined): Promise<boolean> => {
    const config = {
      method: isFavorite ? 'delete' : 'post',
      url: `articles/${slug}/favorite`,
      ...setAuthFromLocalToken(),
    }
    return axios(config).then(() => true)
  }
}
