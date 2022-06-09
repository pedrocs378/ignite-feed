import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './styles.module.css'

export function Comment() {
  return (
    <div className={styles.comment}>
      <img src="https://github.com/pedrocs378.png" />

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

            <button title="Excluir comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}