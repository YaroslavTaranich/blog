import { FC, memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/reduxHooks'
import { StatusType } from '../../models/status'
import { removeArtilce } from '../../redux/slices/articlesSlice'
import Button, { ButtonWithConfirm } from '../UI/button/button'

import styles from './article.module.css'

interface ArtileControlsProps {
  status: StatusType
}

const ArtileControls: FC<ArtileControlsProps> = ({ status }) => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onDelite = () => {
    dispatch(removeArtilce(params.slug as string))
  }

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <ButtonWithConfirm type="danger" size="sm" onClick={onDelite} loading={status === 'deleting'}>
          Delete
        </ButtonWithConfirm>

        <Button type="success" size="sm" onClick={() => navigate('edit')}>
          Edit
        </Button>
      </div>
      {status === 'deleteError' && <div className={styles.delete_error}>Can not delete this article</div>}
    </div>
  )
}

export default memo(ArtileControls)
