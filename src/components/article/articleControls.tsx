import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ArticleService from '../../services/ArticleServise'
import Button, { ButtonWithConfirm } from '../UI/button/button'

import styles from './article.module.css'

const ArtileControls: FC = () => {
  const articleServise = new ArticleService()

  const params = useParams()
  const navigate = useNavigate()
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [errorDelete, setErrorDelete] = useState(false)

  const onDelite = () => {
    setLoadingDelete(true)
    articleServise
      .deliteArticle(params.slug as string)
      .then((res) => {
        if (res) navigate(-1)
      })
      .catch(() => setErrorDelete(true))
      .finally(() => setLoadingDelete(false))
  }

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <ButtonWithConfirm type="danger" size="sm" onClick={onDelite} loading={loadingDelete}>
          Delete
        </ButtonWithConfirm>

        <Button type="success" size="sm" onClick={() => navigate('edit')}>
          Edit
        </Button>
      </div>
      {errorDelete && <div className={styles.delete_error}>Can not delete this article</div>}
    </div>
  )
}

export default ArtileControls
