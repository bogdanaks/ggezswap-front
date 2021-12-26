import React from 'react'

import styles from './styles.module.scss'

const SearchInput = () => {
  return (
    <input className={styles.input} placeholder="Search" type="text" />
  )
}

export default SearchInput
