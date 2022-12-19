import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { logout } from '@/pages/Auth/redux/authSlice'
import { RoutersPaths } from '../Routers/types'
import { links } from './const'
import styles from './styles.module.scss'

export const Navigation: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  const [isHide, setIsHide] = useState(true)

  const className = classnames(styles.navigation, {
    [styles.hide]: isHide,
  })

  const handlerToggle = () => {
    setIsHide(prev => !prev)
  }

  const handlerClick = useCallback((event: MouseEvent) => {
    const navigationElement = document.getElementById('navigation') as Element
    const target = event.target as Element

    const isClickOutside = !navigationElement.contains(target)

    if (isClickOutside) {
      handlerToggle()
    }
  }, [])

  const handlerLogout = async () => {
    try {
      await dispatch(logout())
      handlerToggle()
      history.push(RoutersPaths.main)
    } catch (error) {
      console.log(error)
    }
  }

  const listNodes = useMemo(
    () =>
      links.map(link => (
        <NavLink
          key={link.to}
          className={`${styles.link} ${user && link.to === RoutersPaths.auth ? styles.link_hide : ''}`}
          activeClassName={styles.active}
          onClick={handlerToggle}
          to={link.to}
          exact>
          {link.name}
        </NavLink>
      )),
    [user]
  )

  useEffect(() => {
    if (!isHide) {
      document.addEventListener('click', handlerClick, true)
    }

    return () => {
      document.removeEventListener('click', handlerClick, true)
    }
  }, [isHide, handlerClick])

  return (
    <nav id="navigation" className={className}>
      {listNodes}
      {user && (
        <button className={styles.auth} onClick={handlerLogout}>
          Выйти
        </button>
      )}
      <button className={styles.button} onClick={handlerToggle}>
        {isHide ? '>>' : '<<'}
      </button>
    </nav>
  )
}
