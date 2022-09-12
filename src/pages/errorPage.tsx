import { useNavigate } from 'react-router-dom'

import Button from '../components/UI/button/button'

import styles from './pages.module.css'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.error_page}>
      <h2>404</h2>
      <p className={styles.error_message}>We could not find this page.</p>
      <Button type="black" onClick={() => navigate('/')}>
        Go to main page
      </Button>
    </section>
  )
}

export default ErrorPage
