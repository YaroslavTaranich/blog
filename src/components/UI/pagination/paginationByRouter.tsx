import { FC, memo } from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './pagination.module.css'

const getPagesNumbers = (currentPage: number, totalPages: number): number[] => {
  let firstPage = currentPage < 4 ? 1 : currentPage - 2
  if (firstPage + 5 > totalPages && totalPages - 4 > 0) firstPage = totalPages - 4
  const res: number[] = []

  const length = totalPages - 5 > 1 ? 5 : totalPages

  for (let i = firstPage; i < firstPage + length; i++) {
    res.push(i)
  }
  return res
}
interface PaginationProps {
  totalPages: number
  origin: string
}

const PaginationByRouter: FC<PaginationProps> = ({ totalPages, origin }) => {
  const { page } = useParams()
  const currentPage = Number(page)
  const pageButtons = getPagesNumbers(Number(page), totalPages)

  return (
    <ul className={styles.pagination}>
      {currentPage > 1 && (
        <li>
          <Link to={`${origin}${currentPage - 1}`} className={styles.prev}>
            &lt;
          </Link>
        </li>
      )}

      {currentPage > 5 && (
        <>
          <li>
            <Link to={`${origin}1`} className={styles.page_button}>
              1
            </Link>
          </li>
          <li>
            <Link to={`${origin}${currentPage - 5}`} className={styles.page_button}>
              ...
            </Link>
          </li>
        </>
      )}

      {pageButtons.map((button) => (
        <li key={`pagination-${button}`}>
          <Link
            to={`${origin}${button}`}
            className={button === currentPage ? styles.page_button_active : styles.page_button}
          >
            {button}
          </Link>
        </li>
      ))}

      {currentPage < totalPages - 5 && (
        <>
          <li>
            <Link to={`${origin}${currentPage + 5}`} className={styles.page_button}>
              ...
            </Link>
          </li>
          <li>
            <Link to={`${origin}${totalPages}`} className={styles.page_button}>
              {totalPages}
            </Link>
          </li>
        </>
      )}

      {currentPage < totalPages && (
        <li>
          <Link to={`${origin}${currentPage + 1}`} className={styles.next}>
            &gt;
          </Link>
        </li>
      )}
    </ul>
  )
}

export default memo(PaginationByRouter)
