import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/redux/hooks'
import { Link } from 'react-router-dom'
import { type FieldValues, useForm, FormProvider } from 'react-hook-form'

import { ProfileUserDataList } from './components/ProfileUserDataList'
import { EditButton } from './components/EditButton'
import { SubmitButton } from './components/SubmitButton'
import { ButtonVariant } from '../../components/UI/Button'
import { showSnackBar } from '../../components/Snackbar/redux/snackbarSlice'
import { ImageUploader } from '../../components/ImageUploader'
import { changeUserProfile, setProfileView, changeUserAvatar } from '../Auth/redux/authSlice'

import styles from './styles.module.scss'

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()

  const { profileView, user } = useAppSelector(state => state.auth)

  const methods = useForm({
    defaultValues: {
      email: user?.email,
      login: user?.login,
      first_name: user?.first_name,
      second_name: user?.second_name,
      phone: user?.phone,
    },
  })

  const [avatar, setAvatar] = useState<File | null>(null)

  const onSubmit = async (data: FieldValues): Promise<void> => {
    const response = await dispatch(changeUserProfile(data))

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
    } catch (e) {
      dispatch(showSnackBar('Что то не так...'))
    }
  }

  return (
    <div className={styles.profile}>
      <div className="container">
        <ImageUploader onChange={setAvatar} onClick={handleSubmitAvatar} initPreview={user?.avatar as string} />
        <section className={styles.list}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <ProfileUserDataList />
              {profileView ? (
                <EditButton>Изменить</EditButton>
              ) : (
                <div className={styles.buttons}>
                  <SubmitButton />
                  <EditButton variant={ButtonVariant.SECONDARY}>Отмена</EditButton>
                </div>
              )}
            </form>
          </FormProvider>
          <br />
          <Link style={{ color: '#FFF' }} to="/change-password">
            Изменить пароль
          </Link>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
