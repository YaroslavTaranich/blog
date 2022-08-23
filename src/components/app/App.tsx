import { Routes, Route, Navigate } from 'react-router-dom'

import ArticlesList from '../articlesList/articlesList'
import Article from '../article/article'
import Header from '../header/header'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="articles">
          <Route index element={<Navigate to="/articles/1" replace />} />
          <Route path=":page">
            <Route index element={<ArticlesList />} />
            <Route path=":slug" element={<Article />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/articles/1" replace />} />
      </Routes>
    </>
  )
}

export default App
