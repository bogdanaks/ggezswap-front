import React from 'react'
import Image from 'next/image'

import { ItemInventory } from '@interfaces'

import styles from './styles.module.scss'

interface InventoryItemProps {
  item: ItemInventory
  onClickItem: (item: ItemInventory) => void
}

const InventoryItem = ({ item, onClickItem }: InventoryItemProps) => {
  return (
    <li className={styles.innerBlock} onClick={() => onClickItem(item)}>
      <div className={styles.itemBlock}>
        <div className={styles.itemBlock__imgBlock}>
          <Image src={item.steamImg} layout={'fill'} alt="Item" className={styles.img} />
        </div>
        <p className={styles.desc}>{item.fullName}</p>
      </div>
    </li>
  )
}

export default InventoryItem
