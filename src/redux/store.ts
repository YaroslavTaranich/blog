import { configureStore } from '@reduxjs/toolkit'

import userReduser from './slices/userSlice'
import articlesReduser from './slices/articlesSlice'

const store = configureStore({
  reducer: {
    user: userReduser,
    articles: articlesReduser,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
