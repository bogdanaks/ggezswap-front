import React from 'react'
import Image from 'next/image'
import cookie from 'js-cookie'
import cn from 'classnames'
import Link from 'next/link'

import { loginSteam } from '@api'
import { SteamPlayer } from '@interfaces'

import ConnectWalletModal from '@components/ui/header/components/connect-wallet-modal'
import { useWeb3React } from '@web3-react/core'

import styles from './styles.module.scss'
import { injected } from '@utils/connectors'

const Header = () => {
  const [steamProfile, setSteamProfile] = React.useState<SteamPlayer>()
  const [isOpenConnectWalletModal, setIsOpenConnectWalletModal] = React.useState(false)
  const { account, error, active, activate } = useWeb3React()

  const handleAuthSteamClick = async () => {
    await loginSteam()
  }

  const handleAuthWalletClick = async () => {
    setIsOpenConnectWalletModal(true)
  }

  const handleCloseModal = (e: any) => {
    e.stopPropagation()
    setIsOpenConnectWalletModal(false)
  }

  const formattingAddress = (address: string) => {
    const first = address.slice(0, 2)
    const last = address.slice(-4)
    return `${first}...${last}`
  }

  React.useEffect(() => {
    (async () => {
      const isAuthorizedProvider = await injected.isAuthorized()
      if (isAuthorizedProvider && !active && !error) {
        const chainId = await injected.getChainId()

        if (chainId !== 97) {
          try {
            const provider = await injected.getProvider()
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }], // 97
            })

          } catch (err) {
            console.error('networkChanged error: ', err)
          }
        }

        await activate(injected)
      }
    })()
  }, [active, activate, error])

  React.useEffect(() => {
    setSteamProfile(JSON.parse(cookie.get("steamProfile") as string))
  }, [])

  if (!steamProfile) {
    return <p>Loading</p>
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.logoText}>
        <Link href="/">
          <a>GGEZSWAP</a>
        </Link>
      </h1>
      {account ? (
        <div className={styles.walletBlock}>
          <p>{formattingAddress(account)}</p>
        </div>
      ) : (
        <button onClick={handleAuthWalletClick} className={cn(styles.buttonHeader, styles.buttonWallet)}>
          <span>Connect Wallet</span>
          <ConnectWalletModal isOpen={isOpenConnectWalletModal} onCloseModal={handleCloseModal} />
        </button>
      )}
      {steamProfile ? (
        <div className={styles.avatarBlock}>
          <h4>{steamProfile.personaname}</h4>
          <Image className={styles.avatarImg} src={steamProfile.avatarmedium} width={40} height={40} alt="Avatar" />
        </div>
      ) : (
        <button onClick={handleAuthSteamClick} className={cn(styles.buttonHeader, styles.buttonSteam)}>
          <Image src='/assets/images/icons/steam.svg' alt={'Steam'} width={30} height={30} className={styles.imgSteam} />
          <span>SignIn Steam</span>
        </button>
      )}
    </div>
  )
}

export default Header
