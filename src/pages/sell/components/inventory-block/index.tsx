import React from 'react'
import { InventoryBlockType, ItemInventory } from '@interfaces'
import InventoryItem from '@components/inventory-item'

import styles from './styles.module.scss'

interface InventoryBlockProps {
  title: string
  type: InventoryBlockType
  items: ItemInventory[]
  onActionClick: (item: ItemInventory) => void
  onTradeClick?: () => void
}

const InventoryBlock = ({ title, type, items, onActionClick, onTradeClick }: InventoryBlockProps) => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.head}>
        <span>{title}</span>
        {type === InventoryBlockType.TRADE && (<button onClick={onTradeClick}>Trade</button>)}
      </div>
      <ul className={styles.wrapper}>
        {items.map((item) => (
          <InventoryItem item={item} key={item.assetId} onClickItem={onActionClick} />
        ))}
      </ul>
    </div>
  )
}

export default InventoryBlock
