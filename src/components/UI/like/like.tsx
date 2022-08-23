import { FC } from 'react'

// import like from './like.svg'
import styles from './like.module.css'

interface LikeProps {
  onClick?: () => void
  count: number
}

const Like: FC<LikeProps> = ({ count, onClick }) => (
  <div className={styles.like}>
    <button className={styles.button} type="button" onClick={onClick}>
      &nbsp;
    </button>

    <span className={styles.favorites}>{count}</span>
  </div>
)

Like.defaultProps = {
  onClick: () => {},
}

export default Like
