import { IArticle } from './articles'
import { IUser, IUserError } from './user'

export interface IUserResponce {
  user: IUser | IUserError
}

export interface IArticlesResponce {
  articles: IArticle[]
  articlesCount: number
}

export interface IArticleResponce {
  article: IArticle
}

// export interface IArticleError {
//   message: string
//   error: {
//     status: number
//     [key: string]: string | number
//   }
// }
