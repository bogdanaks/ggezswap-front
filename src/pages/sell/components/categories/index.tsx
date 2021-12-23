import React from 'react'

import styles from './styles.module.scss'

const Categories = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.ul}>
        <li>All</li>
        <li>FT</li>
        <li>DT</li>
        <li>AM</li>
        <li>SG</li>
      </ul>
    </div>
  )
}

export default Categories
