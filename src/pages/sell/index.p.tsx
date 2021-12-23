import React from 'react'
import cookie from 'js-cookie'
import { InventoryBlockType, ItemInventory } from '@interfaces'

import { getSteamUserInventory } from '@api'

import Header from '@components/ui/header'
import AddTradeLinkModal from '@components/add-trade-link-modal'

import Categories from './components/categories'
import InventoryBlock from './components/inventory-block'

import styles from './styles.module.scss'

const SellPage = () => {
  const [inventory, setInventory] = React.useState<ItemInventory[]>([])
  const [tradeItems, setTradeItems] = React.useState<ItemInventory[]>([])
  const [isOpenAddLink, setIsOpenAddLink] = React.useState(false)

  const handleAddItemToTrade = (item: ItemInventory) => {
    setTradeItems((prevState) => ([...prevState, item]))
    setInventory((prevState => (prevState.filter((i) => i.assetId !== item.assetId))))
  }

  const handleDeleteTradeItem = (item: ItemInventory) => {
    setInventory((prevState) => ([item, ...prevState]))
    setTradeItems((prevState => (prevState.filter((i) => i.assetId !== item.assetId))))
  }

  const handleTradeClick = () => {
    const tradeLink = cookie.get('tradeLink')
    console.log('tradeLink: ', tradeLink)
    if (!tradeLink) {
      setIsOpenAddLink(true)
      return
    }

    console.log('link exist')
  }

  const handleCloseAddLinkModal = (e: any) => {
    e.preventDefault()
    handleTradeClick()
    setIsOpenAddLink(false)
  }

  React.useEffect(() => {
    (async () => {
      const data = await getSteamUserInventory()
      setInventory(data)
    })()
  }, [])

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Categories />
        <div className={styles.inventorySide}>
          <InventoryBlock
            title="You trade"
            type={InventoryBlockType.TRADE}
            items={tradeItems}
            onActionClick={handleDeleteTradeItem}
            onTradeClick={handleTradeClick}
          />
          <InventoryBlock
            title="You inventory"
            type={InventoryBlockType.INVENTORY}
            items={inventory}
            onActionClick={handleAddItemToTrade}
          />
        </div>
        <AddTradeLinkModal isOpen={isOpenAddLink} onCloseModal={handleCloseAddLinkModal} />
      </div>
    </div>
  )
}

export default SellPage
