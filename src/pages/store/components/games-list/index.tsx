import React from 'react'

import { Game } from '@interfaces'
import GameItem from '@components/game-item'

import styles from './styles.module.scss'

interface GameListProps {
  games: Game[]
}

const GameList: React.FC<GameListProps> = ({ games }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperSelectItem}>
        <GameItem game={games[0]} style={{ marginBottom: 0 }} />
        <span className={styles.arrow}>^</span>
      </div>
      <ul className={styles.wrapperList}>
        {games.map((item) => (
          <GameItem key={item.app_id} game={item} />
        ))}
      </ul>
    </div>
  )
}

export default GameList
