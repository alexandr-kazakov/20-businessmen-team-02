import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ClickOutside } from '../ClickOutside'
import { links } from './const'
import styles from './styles.module.scss'

export const Navigation: React.FC = () => {
  const [isHide, setIsHide] = useState(true)

  const className = classnames(styles.navigation, {
    [styles.hide]: isHide,
  })

  const handlerToggle = () => {
    setIsHide(prev => !prev)
  }

  return (
    <ClickOutside isActive={!isHide} onClick={handlerToggle}>
      <nav className={className}>
        {links.map(link => (
          <NavLink
            key={link.to}
            className={styles.link}
            activeClassName={styles.active}
            onClick={handlerToggle}
            to={link.to}
            exact>
            {link.name}
          </NavLink>
        ))}
        <button className={styles.button} onClick={handlerToggle}>
          {isHide ? '>>' : '<<'}
        </button>
      </nav>
    </ClickOutside>
  )
}
