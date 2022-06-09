import styles from './styles.module.css'

type AvatarProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function Avatar(props: AvatarProps) {
  return <img className={styles.avatar} {...props} />
}