/* eslint-disable no-param-reassign */
import {
  CaseReducer,
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit'

import { IArticle, IArticlePostData, IGetArticleList } from '../../models/articles'
import { ArticleStatus, FetchStatus } from '../../models/enums'
import ArticleService from '../../services/ArticleServise'
import type { RootState } from '../store'

const { getArticles, getArticle, postArticle, editArticle, deleteArticle, likeArticle } = new ArticleService()

const articlesAdapter = createEntityAdapter<IArticle>({ selectId: (article) => article.slug })

interface ArticleState extends EntityState<IArticle> {
  currentSlug: string | null
  articlesCount: number | null
  fetchStatus: FetchStatus
  articleStatus: ArticleStatus
  error: any | null
}

const initialState: ArticleState = articlesAdapter.getInitialState({
  currentSlug: null,
  articlesCount: null,
  fetchStatus: FetchStatus.loading,
  articleStatus: ArticleStatus.read,
  error: null,
})

export const getArticlesByPage = createAsyncThunk(
  'articles/getArticles',
  async ({ offset, limit }: IGetArticleList, { rejectWithValue }) =>
    getArticles(offset, limit)
      .then((articles) => articles)
      .catch((error) => rejectWithValue(error))
)

export const getArticleBySlug = createAsyncThunk<IArticle, string, { state: RootState }>(
  'articles/getArticle',
  async (slug: string, { rejectWithValue, getState }) => {
    const { articles } = getState()
    if (articles.entities[slug]) return articles.entities[slug] as IArticle
    return getArticle(slug)
      .then((article) => article)
      .catch((error) => rejectWithValue(error))
  }
)

export const createNewArticle = createAsyncThunk(
  'articles/createArticle',
  async (body: IArticlePostData, { rejectWithValue }) =>
    postArticle(body)
      .then((newArticle) => newArticle)
      .catch((error) => rejectWithValue(error))
)

interface IUpdateArticleData {
  slug: string
  body: IArticlePostData
}

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ slug, body }: IUpdateArticleData, { rejectWithValue }) =>
    editArticle(slug, body)
      .then((article) => article)
      .catch((error) => rejectWithValue(error))
)

export const removeArtilce = createAsyncThunk('articles/removeArticle', async (slug: string, { rejectWithValue }) =>
  deleteArticle(slug)
    .then((isDeleted) => isDeleted)
    .catch((error) => rejectWithValue(error))
)

interface IFavoriteParams {
  slug: string
  isFavorite: boolean
}

const setFavorite = createAction<IFavoriteParams>('article/setFavorite')

export const toggleFavoriteArticle = createAsyncThunk(
  'articles/favorite',
  async ({ slug, isFavorite }: IFavoriteParams, { dispatch }) =>
    likeArticle(slug, isFavorite).then(() => dispatch(setFavorite({ slug, isFavorite })))
)

function loadingArticle(articleStatus: ArticleStatus): CaseReducer<ArticleState> {
  return (state) => ({
    ...state,
    fetchStatus: FetchStatus.loading,
    articleStatus,
    error: null,
  })
}

function errorArticle(articleStatus: ArticleStatus): CaseReducer<ArticleState> {
  return (state, action) => ({
    ...state,
    fetchStatus: FetchStatus.error,
    articleStatus,
    error: action.payload,
  })
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesByPage.pending, loadingArticle(ArticleStatus.read))
    builder.addCase(getArticlesByPage.rejected, errorArticle(ArticleStatus.read))
    builder.addCase(getArticlesByPage.fulfilled, (state, action) => {
      state.fetchStatus = FetchStatus.success
      state.articleStatus = ArticleStatus.read
      state.error = null
      state.currentSlug = null
      state.articlesCount = action.payload.articlesCount
      articlesAdapter.setAll(state, action.payload.articles)
    })

    builder.addCase(getArticleBySlug.pending, loadingArticle(ArticleStatus.read))
    builder.addCase(getArticleBySlug.rejected, errorArticle(ArticleStatus.read))
    builder.addCase(getArticleBySlug.fulfilled, (state, action) => {
      state.fetchStatus = FetchStatus.success
      state.articleStatus = ArticleStatus.read
      state.error = null
      state.currentSlug = action.payload.slug
      articlesAdapter.addOne(state, action.payload)
    })

    builder.addCase(createNewArticle.pending, loadingArticle(ArticleStatus.create))
    builder.addCase(createNewArticle.rejected, errorArticle(ArticleStatus.create))
    builder.addCase(createNewArticle.fulfilled, (state, action) => {
      state.fetchStatus = FetchStatus.success
      state.articleStatus = ArticleStatus.create
      state.error = null
      state.currentSlug = action.payload.slug
      articlesAdapter.addOne(state, action.payload)
    })
    builder.addCase(updateArticle.pending, loadingArticle(ArticleStatus.update))
    builder.addCase(updateArticle.rejected, errorArticle(ArticleStatus.update))
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.fetchStatus = FetchStatus.success
      state.articleStatus = ArticleStatus.update
      state.error = null
      state.currentSlug = action.payload.slug
      articlesAdapter.setOne(state, action.payload)
    })

    builder.addCase(removeArtilce.pending, loadingArticle(ArticleStatus.delete))
    builder.addCase(removeArtilce.rejected, errorArticle(ArticleStatus.delete))
    builder.addCase(removeArtilce.fulfilled, (state) => {
      state.fetchStatus = FetchStatus.success
      state.articleStatus = ArticleStatus.delete
    })

    builder.addCase(setFavorite, (state, action) => {
      const { slug } = action.payload
      const { favorited, favoritesCount } = state.entities[slug] as IArticle
      articlesAdapter.updateOne(state, {
        id: slug,
        changes: {
          favorited: !favorited,
          favoritesCount: favorited ? favoritesCount - 1 : favoritesCount + 1,
        },
      })
    })
  },
})

export default articlesSlice.reducer

const selectArticles = (state: RootState) => state.articles

export const getArticlesInfo = createSelector(selectArticles, (articles) => {
  const { articlesCount, error, fetchStatus, articleStatus, currentSlug } = articles
  return {
    fetchStatus,
    articleStatus,
    error,
    articlesCount,
    currentSlug,
  }
})

export const getCurrentArticle = createSelector(selectArticles, (articles) => {
  const { entities, currentSlug } = articles
  return entities[currentSlug as string] as IArticle
})
// const simpleSelectors = articlesAdapter.getSelectors()
export const artcilesSelectors = articlesAdapter.getSelectors<RootState>((state) => state.articles)
