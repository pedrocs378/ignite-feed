import { useMemo } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar'
import { Comment } from '../Comment'

import { PostProps } from '../../App'

import styles from './styles.module.css'

export function Post({ author, publishedAt, content }: PostProps) {
  const formattedPublishedAt = useMemo(() => {
    const dateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale: ptBR,
      addSuffix: true
    })
    
    return {
      title: format(publishedAt, "dd 'de' LLLL 'às' HH:mm", {
        locale: ptBR
      }),
      dateRelativeToNow
    }
  }, [publishedAt])

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={formattedPublishedAt.title}
          dateTime={publishedAt.toISOString()}
        >
          {formattedPublishedAt.dateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === 'paragraph') {
            return <p>{item.content}</p>
          } else {
            return (
              <p>
                <a href="#">{item.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}