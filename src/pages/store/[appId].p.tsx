import React from 'react'
import * as cookie from 'cookie'

import Header from '@components/ui/header'
import InventoryItem from '@components/inventory-item'

import { getGamesList, getSteamUserInventory } from '@api'
import { Game, ItemInventory, SteamPlayer } from '@interfaces'

import Categories from './components/categories'
import GameList from './components/games-list'

import styles from './styles.module.scss'
import { GetServerSidePropsContext, NextPage } from 'next'
import SearchInput from './components/search-input'

interface StorePageProps {
  games: Game[]
  inventory: ItemInventory[]
}

interface IGetServerSideProps {
  query: {
    appId: string
  }
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (ctx.req.headers.cookie == null || !ctx.query.appId) {
    return {
      notFound: true,
    }
  }

  const cookies = cookie.parse(ctx.req.headers.cookie)
  const steamProfile: SteamPlayer = JSON.parse(cookies.steamProfile) || null

  const games = await getGamesList()
  const inventory = await getSteamUserInventory(steamProfile.steamid, String(ctx.query.appId))

  if (!games || !inventory) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      games,
      inventory,
    }
  }
}

const StorePage: NextPage<StorePageProps> = ({ games, inventory }) => {
  const [inventoryList, setInventoryList] = React.useState<ItemInventory[]>([])
  const [cart, setCart] = React.useState<ItemInventory[]>([])

  const handleAddItemToCart = (item: ItemInventory) => {
    setCart((prevState) => ([...prevState, item]))
  }

  const handleDelItemToCart = (item: ItemInventory) => {
    setCart((prevState => (prevState.filter((i) => i.assetId !== item.assetId))))
  }

  React.useEffect(() => {
    (async () => {
      setInventoryList(inventory)
    })()
  }, [inventory])

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <GameList games={games} />
          <SearchInput />
        </div>
        <div className={styles.innerContainer}>
          <Categories />
          <div className={styles.containerItems}>
            <ul className={styles.itemsListTrade} style={{ height: cart.length ? '45%' : '100%' }}>
              {inventory.map((item, index) => (
                <InventoryItem key={index} item={item} onClickItem={handleAddItemToCart} />
              ))}
            </ul>
            {cart.length ? (
              <div className={styles.itemsListCartContainer}>
                <div className={styles.itemsListCartContainer__header}>
                  <span className={styles.price}>$123123</span>
                  <button className={styles.buttonBuy}>Buy</button>
                </div>
                <ul className={styles.itemsListCart}>
                  {cart.map((item) => (
                    <InventoryItem key={item.assetId} item={item} onClickItem={handleDelItemToCart} />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorePage
