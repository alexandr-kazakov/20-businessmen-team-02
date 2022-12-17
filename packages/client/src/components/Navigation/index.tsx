import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { logout } from '@/pages/Auth/redux/authSlice'
import { ClickOutside } from '../ClickOutside'
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

  const handlerLogout = async () => {
    try {
      await dispatch(logout())
      handlerToggle()
      history.push(RoutersPaths.main)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ClickOutside isActive={!isHide} onClick={handlerToggle}>
      <nav className={className}>
        {links.map(link => (
          <NavLink
            key={link.to}
            className={`${styles.link} ${user && link.to === RoutersPaths.auth ? styles.link_hide : ''}`}
            activeClassName={styles.active}
            onClick={handlerToggle}
            to={link.to}
            exact>
            {link.name}
          </NavLink>
        ))}
        {user && (
          <button className={styles.auth} onClick={handlerLogout}>
            Выйти
          </button>
        )}
        <button className={styles.button} onClick={handlerToggle}>
          {isHide ? '>>' : '<<'}
        </button>
      </nav>
    </ClickOutside>
  )
}
