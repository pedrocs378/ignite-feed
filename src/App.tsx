import { faker } from '@faker-js/faker'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

import styles from './App.module.css'

type Author = {
  avatarUrl: string
  name: string
  role: string
}

type Content = {
  type: 'paragraph' | 'link'
  content: string
}

export type PostProps = {
  id: string
  author: Author
  publishedAt: Date
  content: Content[]
}

const createDefaultPost = (): PostProps => ({
  id: faker.datatype.uuid(),
  author: {
    avatarUrl: faker.internet.avatar(),
    name: faker.internet.userName(),
    role: 'Frontend Developer'
  },
  publishedAt: faker.date.recent(),
  content: [
    {
      type: 'paragraph',
      content: 'Fala galeraa 👋'
    },
    {
      type: 'paragraph',
      content: faker.lorem.paragraph()
    },
    {
      type: 'link',
      content: faker.internet.url()
    }
  ]
})

const posts: PostProps[] = Array.from({ length: 10 }, createDefaultPost)

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </main>
      </div>
    </div>
  )
}

export { App }
