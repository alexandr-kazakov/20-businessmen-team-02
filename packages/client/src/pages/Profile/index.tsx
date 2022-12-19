import React from 'react'

import { Button } from '@/components/UI/Button'
import { ProfileUserDataList } from './components/ProfileUserDataList'

import styles from './styles.module.scss'

const ProfilePage: React.FC = () => (
  <div className={styles.profile}>
    <div className="container">
      <section className={styles.avatar}>
        <img src="https://via.placeholder.com/130" alt="User avatar" />
      </section>
      <section className={styles.list}>
        <ProfileUserDataList />
      </section>
      <section className={styles.list}>
        <Button type="button">Изменить</Button>
      </section>
    </div>
  </div>
)

export default ProfilePage
