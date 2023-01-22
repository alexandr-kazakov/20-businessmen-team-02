import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/redux/hooks'

import { ProfileUserDataList } from './components/ProfileUserDataList'
import { EditButton } from './components/EditButton'
import { SubmitButton } from './components/SubmitButton'
import { setProfilenView, changeUserProfile } from './redux/profileSlice'

import styles from './styles.module.scss'

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { profilenView } = useAppSelector(state => state.profile)

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const { target }: any = event
    const first_name: string = target[0].value
    const second_name: string = target[1].value
    const display_name: string = target[2].value
    const login: string = target[3].value
    const email: string = target[4].value
    const phone: string = target[5].value

    const response = await dispatch(changeUserProfile({ first_name, second_name, display_name, login, email, phone }))

    if (response.error) {
      console.log(response.error)
    } else {
      dispatch(setProfilenView())
    }
  }

  return (
    <div className={styles.profile}>
      <div className="container">
        <section className={styles.avatar}>
          <img src="https://via.placeholder.com/130" alt="User avatar" />
        </section>
        <section className={styles.list}>
          <form onSubmit={handlerSubmit}>
            <ProfileUserDataList />
            {profilenView ? <EditButton /> : <SubmitButton />}
          </form>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
