import React from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import ConnectWalletModal from '@components/ui/header/components/connect-wallet-modal'

import { formattingAddress } from '@utils/formatting-address'
import { SteamPlayer } from '@interfaces'

import styles from './styles.module.scss'

interface ProfileButtonProps {
  account: string | undefined | null
  steamProfile: SteamPlayer | undefined | null
  isOpenMenu: boolean
  onAuthSteam: () => void
  onDisconnectWallet: () => void
  onDisconnectSteam: () => void
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  account,
  steamProfile,
  isOpenMenu,
  onAuthSteam,
  onDisconnectWallet,
  onDisconnectSteam,
}) => {
  const [isOpenConnectWalletModal, setIsOpenConnectWalletModal] = React.useState<boolean>(false)

  const handleCloseModal = (e: any) => {
    e.stopPropagation()
    setIsOpenConnectWalletModal(false)
  }

  const handleOpenConnectWallet = async () => {
    setIsOpenConnectWalletModal(true)
  }

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.wrapperWindowOwner, { [styles.isOpen]: isOpenMenu })}>
        <div className={styles.wrapperWindowInner}>
          {!steamProfile && (
            <button className={styles.steamBtn} onClick={onAuthSteam}>
              <Image src='/assets/images/icons/steam.svg' alt={'Steam'} width={30} height={30} />
              <span className={styles.steamBtn__desc}>Sign In Steam</span>
            </button>
          )}
          {!account && (
            <button onClick={handleOpenConnectWallet} className={styles.connectBtn}>
              Connect Wallet
              <ConnectWalletModal isOpen={isOpenConnectWalletModal} onCloseModal={handleCloseModal} />
            </button>
          )}
          {steamProfile && (
            <h3 className={styles.personName}>{steamProfile.personaname}</h3>
          )}
          {account && (
            <>
              <span className={styles.addressText}>{formattingAddress(account)}</span>
              <div className={styles.balanceBlock}>
                <div>
                  <Image src="/assets/images/icons/metamask.svg" alt="Coin" width={40} height={40} />
                </div>
                <div className={styles.balanceBlock__col}>
                  <h4 className={styles.balanceBlock__col__title}>Current Balance</h4>
                  <span className={styles.balanceBlock__col__balance}>3.123 GG</span>
                </div>
              </div>
              <ul className={styles.links}>
                <li className={styles.links__item}>
                  <Link href="/items">
                    <a>My items</a>
                  </Link>
                </li>
                <li className={styles.links__item} onClick={onDisconnectWallet}>Disconnect wallet</li>
                {steamProfile && (
                  <li className={styles.links__item} onClick={onDisconnectSteam}>Disconnect steam</li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileButton
