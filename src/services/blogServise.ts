/* eslint-disable class-methods-use-this */
import { IArticlesResponce, IArticleResponce } from '../models/responnse'

import axios from './axios'

export default class BlogService {
  getArticles = async (offset = 0, limit = 5): Promise<IArticlesResponce> => {
    // try {
    //   const res = await axios.get('/articles', { params: { offset, limit } })
    //   const data: IArticlesResponce = await res.data
    //   return data
    // } catch (error) {
    //   throw new Error(`Error! failed to load articles :( ${error}`)
    // }
    const res = await axios.get('/articles', { params: { offset, limit } }).catch((error) => {
      throw new Error(`${error.message}`)
    })

    const data: IArticlesResponce = await res.data
    return data
  }

  getArticle = async (slug: string): Promise<IArticleResponce> => {
    const res = await axios.get(`./articles/${slug}`).catch((error) => {
      throw new Error(`${error.message}`)
    })
    const data: IArticleResponce = await res.data
    return data
  }
}
