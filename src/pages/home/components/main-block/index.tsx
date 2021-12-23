import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import styles from './styles.module.scss'

const MainBlock = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainText}>Discover, find,</h2>
      <h2 className={styles.mainTextColored}>Main, text,</h2>
      <h2 className={styles.mainText}>Discover, find,</h2>
      <p className={styles.desc}>Marketplace for monster character cllections non fungible token NFTs</p>
      <div className={styles.btnsBlock}>
        <Link href="/store">
          <a className={cn(styles.btnsBlock__btn, styles.btnBuy)}>Buy item</a>
        </Link>
        <Link href="/sell">
          <a className={cn(styles.btnsBlock__btn, styles.btnSell)}>Sell item</a>
        </Link>
      </div>
    </div>
  )
}

export default MainBlock
