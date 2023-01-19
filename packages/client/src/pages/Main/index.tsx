import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { OAUTH_YANDEX_REDIRECT, oAuthSignIn } from '../../pages/Auth/redux/authSlice'
import { useAppDispatch } from '../../app/redux/hooks'
import { useQuery } from '../../lib/url'

import styles from './styles.module.scss'

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const query = useQuery()

  // oAuthYandex
  useEffect(() => {
    const oauthCode = query.get('code')

    if (oauthCode) {
      ;(async () => {
        await dispatch(
          oAuthSignIn({
            code: oauthCode,
            redirect_uri: OAUTH_YANDEX_REDIRECT,
          })
        )
      })()
    }
  }, [dispatch, query])

  return (
    <div className={styles.pagelanding}>
      <div className="container">
        <section>
          <div className={styles.row}>
            <div className={`${styles['col']} ${styles['col_left']}`}>
              <div className={`${styles['highlight-box']}`}>
                <span className={`${styles['highlight-box__preheader']}`}>Игра - пазл</span>
                <h1 className={`${styles['highlight-box__header']}`}>Спасение Чебурашки</h1>
                <p className={`${styles['highlight-box__desc']}`}>
                  Эпическая игра в реальном времени с HD-графикой. <br />
                  Станьте чемпионом и возглавьте список лидеров!
                </p>
                <div className={`${styles['highlight-box__button']}`}>
                  <Link className={styles.link} to="/game">
                    Играть
                  </Link>
                </div>
              </div>
            </div>
            <div className={`${styles['col']} ${styles['col_right']}`}>
              <div id="puzzle-promo" className={`${styles['puzzle-promo']}`}>
                <img
                  src="/assets/images/parts/ch00.png"
                  alt=""
                  className={`${styles['puzzle-promo__item']} ${styles['puzzle-promo__item_1']}`}
                />
                <img
                  src="/assets/images/parts/ch10.png"
                  alt=""
                  className={`${styles['puzzle-promo__item']} ${styles['puzzle-promo__item_2']}`}
                />
                <img
                  src="/assets/images/parts/ch20.png"
                  alt=""
                  className={`${styles['puzzle-promo__item']} ${styles['puzzle-promo__item_3']}`}
                />
                <img
                  src="/assets/images/parts/ch01.png"
                  alt=""
                  className={`${styles['puzzle-promo__item']} ${styles['puzzle-promo__item_4']}`}
                />
                <img
                  src="/assets/images/parts/ch11.png"
                  alt=""
                  className={`${styles['puzzle-promo__item']} ${styles['puzzle-promo__item_5']}`}
                />
                <img
                  src="/assets/images/parts/ch21.png"
                  alt=""
                  className={`${styles['puzzle-promo__item']} ${styles['puzzle-promo__item_6']}`}
                />
                <img
                  src="/assets/images/parts/ch02.png"
                  alt=""
                  className={`${styles['puzzle-promo__item']} ${styles['puzzle-promo__item_7']}`}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainPage
