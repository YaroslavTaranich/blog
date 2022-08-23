import ReactMarkdown from 'react-markdown'
import { useLocation } from 'react-router-dom'

import useFetch from '../../hooks/useFetching'
import { IArticle } from '../../models/articles'
import TagList from '../tagList/tagList'
import Like from '../UI/like/like'
import Spinner from '../UI/spinner/spinner'
import UserInfo from '../userInfo/userInfo'
// import like from '../../assets/img/like.svg'

import styles from './article.module.css'

// const markdown = `

// # Est Ampyciden pater patent
// ## Amor saxa inpiger
// Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.

// ## Qua deos has fontibus
// Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.

// ## Quamvis pronuba
// Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.

//   1. Clamoribus haesit tenentem iube Haec munera
//   2. Vincla venae
//   3. Paris includere etiam tamen
//   4. Superi te putria imagine Deianira
//   5. Tremore hoste Esse sed perstat capillis siqua

// `

function Article() {
  const location = useLocation()

  const [data, status, errorMessage] = useFetch<{ article: IArticle }>(location.pathname)

  if (status === 'loading') {
    return <Spinner />
  }
  if (status === 'error') {
    return <div>{errorMessage}</div>
  }
  if (data) {
    const {
      article: { title, favoritesCount, author, createdAt, tagList, description, body },
    } = data
    return (
      <article className={styles.article}>
        <header className={styles.header}>
          <h5 className={styles.title}>{title}</h5>
          <Like count={favoritesCount} />
          <div className={styles.authtor}>
            <UserInfo user={author} createdAt={createdAt} />
          </div>
        </header>
        <TagList tags={tagList} />
        <p className={styles.shortText}>{description}</p>
        <section className={styles.markdown}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </section>
      </article>
    )
  }
  return <div>ERROR</div>
}

export default Article
