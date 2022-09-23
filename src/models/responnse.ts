import { IArticle } from './articles'
import { IUser, IUserError } from './user'

export interface IUserResponse {
  user: IUser
}

export interface IArticlesResponce {
  articles: IArticle[]
  articlesCount: number
}

export interface IArticleResponce {
  article: IArticle
}

export interface ServerErrorResponse {
  errors: IUserError
}
