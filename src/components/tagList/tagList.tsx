import { FC } from 'react'

import styles from './tagList.module.css'

interface TagListProps {
  tags: string[]
}

const TagList: FC<TagListProps> = ({ tags }) => (
  <ul className={styles.tag_list}>
    {tags.map((tag) => (
      <li key={tag} className={styles.tag}>
        {tag}
      </li>
    ))}
  </ul>
)

export default TagList
