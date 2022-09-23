/* eslint-disable no-param-reassign */
import { IArticle, IArticleBySlug } from '../models/articles'

interface INormolizedArticles {
  bySlug: IArticleBySlug
  allSlugs: string[]
}

function normolizeArticles(articles: IArticle[]): INormolizedArticles {
  const bySlug = articles.reduce<{ [key: string]: IArticle }>((byId, article) => {
    byId[article.slug] = article
    return byId
  }, {})
  const allSlugs = Object.keys(bySlug)
  return { bySlug, allSlugs }
}

export default normolizeArticles
