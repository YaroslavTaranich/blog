import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from '../../context/authContext'
import ArticlesList from '../articlesList/articlesList'
import Article from '../article/article'
import Header from '../header/header'
import './App.css'
import SignIn from '../../pages/singIn'
import SignUp from '../../pages/singUp'
import Profile from '../../pages/profile'
import ErrorPage from '../../pages/errorPage'
import NewArticle from '../../pages/newArticle'
import EditArticle from '../../pages/editArtcle'
import PrivateRoute from '../privateRoute/privateRoute'

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/articles/1" replace />} />
          <Route path="articles">
            <Route index element={<Navigate to="/articles/1" replace />} />
            <Route path=":page">
              <Route index element={<ArticlesList />} />
              <Route path=":slug">
                <Route index element={<Article />} />
                <Route path="edit" element={<PrivateRoute element={<EditArticle />} />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="new-article" element={<PrivateRoute element={<NewArticle />} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
