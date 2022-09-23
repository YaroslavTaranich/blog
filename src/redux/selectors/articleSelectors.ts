import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

const getArticles = (state: RootState) => state.articles

export const getCurrentArticle = createSelector(getArticles, (articles) => ({
  article: articles.bySlug[articles.currentSlug as string],
  status: articles.status,
  error: articles.error,
}))

export const getArticlesList = createSelector(getArticles, (articles) => {
  const { bySlug, allSlugs, articlesCount, error, status } = articles
  return {
    articlesList: allSlugs.map((slug) => bySlug[slug]),
    bySlug,
    allSlugs,
    status,
    error,
    articlesCount,
  }
})
