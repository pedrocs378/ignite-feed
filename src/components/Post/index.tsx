import { ChangeEvent, FormEvent, InvalidEvent, useCallback, useMemo, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { faker } from '@faker-js/faker'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar'
import { Comment } from '../Comment'

import { PostProps } from '../../App'

import styles from './styles.module.css'

export type Comment = {
  id: string
  content: string
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<Comment[]>([])

  const handleChangeCommentText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('')
    setCommentText(e.target.value)
  }

  const handleCreateNewComment = (e: FormEvent) => {
    e.preventDefault()

    setComments((oldValues) => ([
      ...oldValues,
      {
        id: faker.datatype.uuid(),
        content: commentText
      }
    ]))

    setCommentText('')
  }

  const handleNewCommentInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const handleDeleteComment = useCallback((comment: Comment) => {
    setComments((oldValues) => {
      return oldValues.filter((oldValue) => oldValue.id !== comment.id)
    })
  }, [])

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
            return <p key={item.content}>{item.content}</p>
          } else {
            return (
              <p key={item.content}>
                <a href="#">{item.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
          value={commentText}
          onChange={handleChangeCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={!commentText.trim()}>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              onDeleteClick={() => handleDeleteComment(comment)}
              {...comment}
            />
          )
        })}
      </div>
    </article>
  )
}