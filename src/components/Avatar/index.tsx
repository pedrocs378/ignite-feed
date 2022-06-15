import { memo } from 'react'

import styles from './styles.module.css'

type AvatarProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  hasBorder?: boolean
}

function AvatarComponent({ hasBorder = true, ...rest }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...rest}
    />
  )
}

export const Avatar = memo(AvatarComponent)
