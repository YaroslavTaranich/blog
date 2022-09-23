import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

import './App.css'
import ArticlesList from '../articlesList/articlesList'
import Article from '../article/article'
import Header from '../header/header'
import SignIn from '../../pages/singIn'
import SignUp from '../../pages/singUp'
import Profile from '../../pages/profile'
import ErrorPage from '../../pages/errorPage'
import NewArticle from '../../pages/newArticle'
import EditArticle from '../../pages/editArtcle'
import PrivateRoute from '../privateRoute/privateRoute'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { initUser } from '../../redux/slices/userSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [])

  return (
    <>
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
    </>
  )
}

export default App
