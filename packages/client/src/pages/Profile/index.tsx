import React, { FC } from 'react'
import Button from '../../components/UI/Button'
import { ButtonStyles } from '../../components/UI/Button/types'

import { ProfileUserDataList } from './components/ProfileUserDataList'
import styles from './styles.module.scss'

const ProfilePage: FC = () => {
  return (
    <div className={styles.page_profile}>
      <div className="container">
        <section className={styles.page_profile__user_avatar}>
          <img src="https://via.placeholder.com/130" alt="User avatar" />
        </section>
        <section className={styles.page_profile__user_data_list}>
          <ProfileUserDataList />
        </section>
        <section className={styles.page_profile__user_data_list}>
          <Button variant={ButtonStyles.primary} type="button">
            Изменить
          </Button>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
