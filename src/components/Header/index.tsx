import { Icons } from '../Icons'

import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <Icons.IgniteLogo />

      <strong>Ignite Feed</strong>
    </header>
  )
}
