import { Link } from 'react-router-dom'

import Button from '../UI/button/button'

import styles from './header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/articles" className={styles.title}>
        RealWorld Blog
      </Link>
      <Button type="ghost" size="lg" onClick={() => {}}>
        Sing In
      </Button>
      <Button type="success" size="lg" onClick={() => {}}>
        Sing Up
      </Button>
    </header>
  )
}

export default Header
