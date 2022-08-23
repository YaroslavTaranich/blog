import { FC } from 'react'

import styles from './pagination.module.css'

interface PaginationProps {
  totalCount: number
  currentOffset: number
  perPage: number
  setOffset: (num: number) => void
}

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

const Pagination: FC<PaginationProps> = ({ totalCount, currentOffset, perPage, setOffset }) => {
  const totalPages = Math.ceil(totalCount / perPage)
  const currentPage = currentOffset / perPage + 1
  const pageButtons = getPagesNumbers(currentPage, totalPages)

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.prev}
        onClick={() => setOffset(currentOffset - perPage)}
        disabled={currentOffset - perPage < 0}
      >
        &lt;
      </button>
      {currentPage > 5 && (
        <>
          <button type="button" className={styles.page_button} onClick={() => setOffset(0)}>
            1
          </button>
          <button type="button" className={styles.page_button} onClick={() => setOffset(currentOffset - perPage * 5)}>
            ...
          </button>
        </>
      )}

      {pageButtons.map((button) => (
        <button
          type="button"
          key={`pagination-${button}`}
          className={button === currentPage ? styles.page_button_active : styles.page_button}
          onClick={() => setOffset(button * perPage - perPage)}
        >
          {button}
        </button>
      ))}

      {currentPage < totalPages - 5 && (
        <>
          <button type="button" className={styles.page_button} onClick={() => setOffset(currentOffset + perPage * 5)}>
            ...
          </button>
          <button
            type="button"
            className={styles.page_button}
            onClick={() => setOffset(totalPages * perPage - perPage)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        className={styles.next}
        onClick={() => setOffset(currentOffset + perPage)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
