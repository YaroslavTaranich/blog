import { IArticleFormData, IArticlePostData } from '../models/articles'

export const formatDataToPost = (data: IArticleFormData): IArticlePostData => ({
  title: data.title,
  description: data.description,
  body: data.body,
  tagList: data.tagList.map((tag) => tag.value),
})

export const formatFetchedToData = (data: IArticlePostData): IArticleFormData => ({
  title: data.title,
  description: data.description,
  body: data.body,
  tagList: data.tagList.map((tag) => ({
    value: tag,
  })),
})
