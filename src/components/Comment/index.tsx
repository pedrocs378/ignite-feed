import { memo, useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from '../Avatar'
import { Comment as CommentData } from '../Post'

import styles from './styles.module.css'

type CommentProps = CommentData & {
  onDeleteClick?: () => void
}

function CommentComponent({ content, onDeleteClick }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleLikeComment() {
    setLikeCount((count) => count + 1)
  }

  return (
    <div className={styles.comment}>
      <Avatar src="https://github.com/pedrocs378.png" hasBorder={false} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Pedro César</strong>

              <time
                title="09 de junho às 13:00"
                dateTime="2022-06-09 13:00:00"
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button
              title="Excluir comentário"
              type="button"
              onClick={onDeleteClick}
            >
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}

export const Comment = memo(CommentComponent, (prevProps, nextProps) => {
  return (
    prevProps.content === nextProps.content &&
    prevProps.id === nextProps.id
  )
})
