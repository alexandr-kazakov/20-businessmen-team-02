import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/redux/hooks'

import { ProfileUserDataList } from './components/ProfileUserDataList'
import { EditButton } from './components/EditButton'
import { SubmitButton } from './components/SubmitButton'
import { ButtonVariant } from '../../components/UI/Button'
import { showSnackBar } from '../../components/Snackbar/redux/snackbarSlice'
import { ImageUploader } from '../../components/ImageUploader'
import { profileForm } from './const'
import { changeUserProfile, setProfileView, changeUserAvatar } from '../Auth/redux/authSlice'

import styles from './styles.module.scss'

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState<File | null>(null)

  const { profileView, user } = useAppSelector(state => state.auth)

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

  const handleSubmitAvatar = async () => {
    try {
      if (avatar) {
        const data = new FormData()

        data.append('avatar', avatar)

        await dispatch(changeUserAvatar(data))
        setAvatar(null)
      }
    } catch (error: any) {
      dispatch(showSnackBar(error.message))
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
        <ImageUploader onChange={setAvatar} onClick={handleSubmitAvatar} initPreview={user?.avatar as string} />
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
