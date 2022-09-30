import { FC, memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/reduxHooks'
import { ArticleStatus, FetchStatus } from '../../models/enums'
import { removeArtilce } from '../../redux/slices/articlesSlice'
import Button, { ButtonWithConfirm } from '../UI/button/button'

import styles from './article.module.css'

interface ArtileControlsProps {
  fetchStatus: FetchStatus
  articleStatus: ArticleStatus
}

const ArtileControls: FC<ArtileControlsProps> = ({ fetchStatus, articleStatus }) => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onDelite = () => {
    dispatch(removeArtilce(params.slug as string))
  }

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <ButtonWithConfirm type="danger" size="sm" onClick={onDelite} loading={fetchStatus === FetchStatus.loading}>
          Delete
        </ButtonWithConfirm>

        <Button type="success" size="sm" onClick={() => navigate('edit')}>
          Edit
        </Button>
      </div>
      {fetchStatus === FetchStatus.error && articleStatus === ArticleStatus.delete && (
        <div className={styles.delete_error}>Can not delete this article</div>
      )}
    </div>
  )
}

export default memo(ArtileControls)
