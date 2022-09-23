/* eslint-disable no-param-reassign */
import { CaseReducer, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IArticle, IArticleBySlug, IArticlePostData, IGetArticleList } from '../../models/articles'
import { StatusType } from '../../models/status'
import ArticleService from '../../services/ArticleServise'
import normolizeArticles from '../../utils/normolizeArticles'
// eslint-disable-next-line import/no-cycle
import type { RootState } from '../store'

const { getArticles, getArticle, postArticle, editArticle, deleteArticle, likeArticle } = new ArticleService()

interface ArticleState {
  bySlug: IArticleBySlug
  allSlugs: string[]
  currentSlug: string | undefined
  articlesCount: number | undefined
  status: StatusType
  error: any | undefined
}

const initialState: ArticleState = {
  bySlug: {},
  allSlugs: [],
  currentSlug: undefined,
  articlesCount: undefined,
  status: undefined,
  error: undefined,
}

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
    if (articles.bySlug[slug]) return articles.bySlug[slug]
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

const loadingArticle: CaseReducer<ArticleState> = (state) => ({ ...state, status: 'loading', error: undefined })
const errorArticle: CaseReducer<ArticleState> = (state, action) => ({
  ...state,
  status: 'error',
  error: action.payload,
})

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesByPage.pending, loadingArticle)
    builder.addCase(getArticlesByPage.rejected, errorArticle)
    builder.addCase(getArticlesByPage.fulfilled, (state, action) => {
      const { bySlug, allSlugs } = normolizeArticles(action.payload.articles)
      return {
        ...state,
        status: 'success',
        error: undefined,
        bySlug,
        allSlugs,
        articlesCount: action.payload.articlesCount,
      }
    })

    builder.addCase(getArticleBySlug.pending, loadingArticle)
    builder.addCase(getArticleBySlug.rejected, errorArticle)
    builder.addCase(getArticleBySlug.fulfilled, (state, action) => {
      if (state.bySlug[action.payload.slug]) return { ...state, currentSlug: action.payload.slug, status: 'success' }
      return {
        ...state,
        status: 'success',
        error: undefined,
        currentSlug: action.payload.slug,
        bySlug: { ...state.bySlug, [action.payload.slug]: action.payload },
        allSlugs: [...state.allSlugs, action.payload.slug],
      }
    })

    builder.addCase(createNewArticle.pending, loadingArticle)
    builder.addCase(createNewArticle.rejected, errorArticle)
    builder.addCase(createNewArticle.fulfilled, (state, action) => ({
      ...state,
      status: 'created',
      error: undefined,
      currentSlug: action.payload.slug,
      bySlug: { ...state.bySlug, [action.payload.slug]: action.payload },
      allSlugs: [...state.allSlugs, action.payload.slug],
    }))
    builder.addCase(updateArticle.pending, loadingArticle)
    builder.addCase(updateArticle.rejected, errorArticle)
    builder.addCase(updateArticle.fulfilled, (state, action) => ({
      ...state,
      status: 'updated',
      error: undefined,
      bySlug: { ...state.bySlug, [action.payload.slug]: action.payload },
      allSlugs: [...state.allSlugs, action.payload.slug],
    }))

    builder.addCase(removeArtilce.pending, (state) => ({ ...state, status: 'deleting', error: undefined }))
    builder.addCase(removeArtilce.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      status: 'deleteError',
    }))
    builder.addCase(removeArtilce.fulfilled, (state) => ({
      ...state,
      status: 'deleted',
    }))

    builder.addCase(setFavorite, (state, action) => {
      const { slug } = action.payload
      const { favorited, favoritesCount } = state.bySlug[slug]
      state.bySlug[slug] = {
        ...state.bySlug[slug],
        favorited: !favorited,
        favoritesCount: favorited ? favoritesCount - 1 : favoritesCount + 1,
      }
    })
  },
})

export default articlesSlice.reducer
