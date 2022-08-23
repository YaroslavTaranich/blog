import { Routes, Route } from 'react-router-dom'

import ArticlesList from '../articlesList/articlesList'
import Article from '../article/article'
import Header from '../header/header'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="articles">
          <Route index element={<ArticlesList />} />
          <Route path=":id" element={<ArticlesList />}>
            <Route path=":slug" element={<Article />} />
          </Route>
          {/* <Route path=":slug" element={<Article />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
