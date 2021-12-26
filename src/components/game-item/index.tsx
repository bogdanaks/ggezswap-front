import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Game } from '@interfaces'

import styles from './styles.module.scss'

interface GameItemProps {
  game: Game
  [prop: string]: any
}

const GameItem: React.FC<GameItemProps> = ({ game, ...props }) => {
  return (
    <li className={styles.wrapper} {...props}>
      <Link href={`/store/${game.app_id}`}>
        <a className={styles.linkBlock}>
          <div className={styles.imageBlock}>
            <Image src={`/assets/images/games/${game.app_id}.png`} width={40} height={40} alt={game.title} />
          </div>
          <span className={styles.desc}>{game.title}</span>
        </a>
      </Link>

    </li>
  )
}

export default GameItem
