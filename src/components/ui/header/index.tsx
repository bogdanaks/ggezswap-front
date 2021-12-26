import React from 'react'
import cookie from 'js-cookie'
import Link from 'next/link'

import { loginSteam } from '@api'
import { SteamPlayer } from '@interfaces'

import { useWeb3React } from '@web3-react/core'
import { injected } from '@utils/connectors'
import ProfileButton from '@components/ui/header/components/profile-button'

import styles from './styles.module.scss'
import Image from 'next/image'

const Header = () => {
  const [steamProfile, setSteamProfile] = React.useState<SteamPlayer | null>()
  const { account, error, active, activate, deactivate } = useWeb3React()
  const [isOpenMenu, setIsOpenMenu] = React.useState(false)

  const handleAuthSteam = async () => {
    await loginSteam()
  }

  const handleDisconnectWallet = () => { // TODO doesnt work
    deactivate()
  }

  const handleDisconnectSteam = () => {
    cookie.remove('steamProfile')
    setSteamProfile(null)
  }

  const handleModelClick = () => {
    setIsOpenMenu(!isOpenMenu)
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
    const steamProfile = cookie.get("steamProfile")

    if (steamProfile) {
      setSteamProfile(JSON.parse(steamProfile))
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.logoText}>
        <Link href="/">
          <a>GGEZSWAP</a>
        </Link>
      </h1>
      <ul className={styles.links}>
        <li className={styles.links__item}>
          <Link href="/store/730">
            <a>Store</a>
          </Link>
        </li>
        <li className={styles.links__item}>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
        </li>
        <li className={styles.links__item}>
          <Link href="/faq">
            <a>FAQ</a>
          </Link>
        </li>
      </ul>
      {account && steamProfile ? (
        <div className={styles.avatarBlock} onClick={handleModelClick}>
          <div className={styles.balanceBlock}>
            <span>1.312 GG</span>
          </div>
          <Image className={styles.avatarImg} src={steamProfile!.avatarmedium} width={40} height={40} alt="Avatar" />
        </div>
      ) : (
        <button onClick={handleModelClick} className={styles.buttonHeader}>
          Connect
        </button>
      )}
      <ProfileButton
        account={account}
        steamProfile={steamProfile}
        isOpenMenu={isOpenMenu}
        onAuthSteam={handleAuthSteam}
        onDisconnectWallet={handleDisconnectWallet}
        onDisconnectSteam={handleDisconnectSteam}
      />
    </div>
  )
}

export default Header
