/* eslint-disable class-methods-use-this */
import { IArticlePostData, IArticle } from '../models/articles'
import { IArticlesResponce, IArticleResponce } from '../models/responnse'
import authHeader from '../utils/authHeader'

import axios from './axios'

export default class ArticleService {
  getArticles = async (offset = 0, limit = 5): Promise<IArticlesResponce> => {
    const articles = await axios
      .get('articles', { params: { offset, limit }, ...authHeader() })
      .then<IArticlesResponce>((res) => res.data)
    return articles
  }

  getArticle = async (slug: string): Promise<IArticle> => {
    const article = await axios
      .get<IArticleResponce>(`articles/${slug}`, { ...authHeader() })
      .then((res) => res.data.article)
    return article
  }

  postArticle = async (body: IArticlePostData): Promise<IArticle> => {
    const article = await axios
      .post('articles/', { article: body }, { ...authHeader() })
      .then((res) => res.data.article)
    return article
  }

  editArticle = async (slug: string | undefined, body: IArticlePostData): Promise<IArticle> => {
    const article = await axios
      .put(`articles/${slug}`, { article: body }, { ...authHeader() })
      .then((res) => res.data.article)
    return article
  }

  deleteArticle = async (slug: string): Promise<boolean> => {
    await axios.delete(`articles/${slug}`, { ...authHeader() })
    return true
  }

  likeArticle = async (slug: string | undefined, isFavorite: boolean | undefined): Promise<boolean> => {
    const config = {
      method: isFavorite ? 'delete' : 'post',
      url: `articles/${slug}/favorite`,
      ...authHeader(),
    }
    return axios(config).then(() => true)
  }
}
