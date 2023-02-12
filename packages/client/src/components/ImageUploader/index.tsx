import React, { useEffect, useRef, useState } from 'react'

import { Button, ButtonVariant } from '../../components/UI/Button'
import { showSnackBar } from '../..//components/Snackbar/redux/snackbarSlice'
import { useAppDispatch } from '../../app/redux/hooks'

import styles from './styles.module.scss'

export interface ImageUploaderProps {
  className?: string
  style?: React.CSSProperties
  onChange: (file: File | null) => void
  value?: File | null
  initPreview: string
  onClick: () => void
}

const IMAGE_MIME_TYPE = /image\/(png|jpg|jpeg)/i
const IMAGE_MAX_SIZE = 1000000

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  className,
  style,
  onChange,
  value = null,
  initPreview,
  onClick,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(value)
  const [imagePreview, setImagePreview] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const setSnackbarError = (message: string) => {
    dispatch(showSnackBar(message))
    throw new Error(message)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length) {
      const file = files[0]

      if (file.size > IMAGE_MAX_SIZE) {
        setSnackbarError('Максимальный размер файла 1MB')

        return
      }

      if (!file.type.match(IMAGE_MIME_TYPE)) {
        setSnackbarError(`Выбран не валидный формат файла: ${file.type}`)

        return
      }

      setImageFile(file)
      onChange(file)
    }
  }

  const onRemove = () => {
    setImageFile(null)
    setImagePreview('')
    onChange(null)
  }

  useEffect(() => {
    let isMounted = true
    let fileReader: FileReader

    if (imageFile) {
      // читаем содержимое файла для превью изображения
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        fileReader = reader

        reader.addEventListener('load', () => {
          if (reader.result && typeof reader.result === 'string') {
            resolve(reader.result)
          }
        })

        reader.addEventListener('abort', () => {
          reject(new Error('Чтение файла прервано'))
        })

        reader.addEventListener('error', () => {
          reject(new Error('Ошибка при чтении файла'))
        })

        reader.readAsDataURL(imageFile)
      })
        .then(image => isMounted && setImagePreview(image))
        .catch(e => console.error(e.message))
    }

    return () => {
      isMounted = false

      // если компонент отмонтирован а операция чтения была вызвана и не завершилась то прерываем ее
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [imageFile])

  const onSave = async () => {
    await onClick()
    setImagePreview('')
    setImageFile(null)
  }

  return (
    <div className={className}>
      {!imagePreview && (
        <label tabIndex={0} className={styles.upload} style={style}>
          <img
            className={styles.image}
            src={
              initPreview
                ? `https://ya-praktikum.tech/api/v2/resources/${initPreview}`
                : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
            }
            alt=""
          />
          <input
            className={styles.input}
            onChange={onFileChange}
            ref={inputRef}
            accept="image/jpeg, image/jpg, image/png"
            type="file"
          />
        </label>
      )}

      {imagePreview && (
        <div className={styles.preview}>
          <img className={styles.image} src={imagePreview} alt="" />
          <Button variant={ButtonVariant.SECONDARY} className={styles.close} onClick={onRemove}>
            Отменить
          </Button>
          <Button variant={ButtonVariant.SECONDARY} className={styles.save} onClick={onSave}>
            Сохранить
          </Button>
        </div>
      )}
    </div>
  )
}
