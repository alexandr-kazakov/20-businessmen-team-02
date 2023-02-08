import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/redux/hooks'

import { ProfileUserDataList } from './components/ProfileUserDataList'
import { EditButton } from './components/EditButton'
import { SubmitButton } from './components/SubmitButton'
import { ButtonVariant } from '../../components/UI/Button'
import { showSnackBar } from '../../components/Snackbar/redux/snackbarSlice'
import { profileForm } from './const'
import { changeUserProfile, setProfileView } from '../Auth/redux/authSlice'

import styles from './styles.module.scss'

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { profileView } = useAppSelector(state => state.auth)

  const handlerSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & { [key: string]: { value: string } }
    const profileData: { [key: string]: string } = {}
    for (const field in profileForm) {
      if (Object.prototype.hasOwnProperty.call(profileForm, field)) {
        target[field] && target[field].value !== undefined && (profileData[field] = target[field].value)
      }
    }

    const response = await dispatch(changeUserProfile(profileData))

    if (response.error) {
      dispatch(showSnackBar(response.error.message))
    } else {
      dispatch(setProfileView())
    }
  }

  const buttons = profileView ? (
    <EditButton>Изменить</EditButton>
  ) : (
    <div className={styles.buttons}>
      <SubmitButton />
      <EditButton variant={ButtonVariant.SECONDARY}>Отмена</EditButton>
    </div>
  )

  return (
    <div className={styles.profile}>
      <div className="container">
        <section className={styles.avatar}>
          <img src="https://via.placeholder.com/130" alt="User avatar" />
        </section>
        <section className={styles.list}>
          <form onSubmit={handlerSubmit}>
            <ProfileUserDataList />
            {buttons}
          </form>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
