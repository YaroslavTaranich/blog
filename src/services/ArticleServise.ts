/* eslint-disable class-methods-use-this */
import { IArticlePostData, IArticle } from '../models/articles'
import { IArticlesResponce, IArticleResponce } from '../models/responnse'

import authHeader from './authHeader'
import axios from './axios'

export default class ArticleService {
  getArticles = async (offset = 0, limit = 5): Promise<IArticlesResponce> => {
    const articles = await axios
      .get('articles', { params: { offset, limit } })
      .then<IArticlesResponce>((res) => res.data)
      .catch((error) => {
        throw error
      })
    return articles
  }

  getArticle = async (slug: string): Promise<IArticle> => {
    const article = await axios
      .get<IArticleResponce>(`articles/${slug}`)
      .then((res) => res.data.article)
      .catch((error) => {
        throw new Error(`${error.message}`)
      })
    return article
  }

  postArticle = async (body: IArticlePostData): Promise<IArticle> => {
    const article = await axios
      .post('articles/', { article: body }, { ...authHeader() })
      .then((res) => res.data.article)
      .catch((error) => {
        throw error
      })
    return article
  }

  deliteArticle = async (slug: string): Promise<boolean> => {
    await axios.delete(`articles/${slug}`, { ...authHeader() }).catch((error) => {
      throw error
    })
    return true
  }

  editArticle = async (slug: string | undefined, body: IArticlePostData): Promise<IArticle> => {
    const article = await axios
      .put(`articles/${slug}`, { article: body }, { ...authHeader() })
      .then((res) => res.data.article)
      .catch((error) => {
        throw error
      })
    return article
  }
}
