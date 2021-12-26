import React from 'react'
import Image from 'next/image'

import CustomModal from '@components/ui/custom-modal'
import { useWeb3React } from '@web3-react/core'
import { injected } from '@utils/connectors'

import styles from './styles.module.scss'

interface ConnectWalletModalProps {
  isOpen: boolean
  onCloseModal: (e: any) => void
}

const ConnectWalletModal = ({ isOpen, onCloseModal }: ConnectWalletModalProps) => {
  const { activate, deactivate } = useWeb3React()
  const connectWallet = async (e: any) => {
    try {
      await activate(injected)
      onCloseModal(e)
    } catch (err) {
      console.error("Error connect: ", err)
    }
  }

  const disconnectWallet = async () => {
    try {
      deactivate()
    } catch (err) {
      console.error("Error deactivate: ", err)
    }
  }

  return (
    <CustomModal
      options={{
        isOpen,
        onRequestClose: onCloseModal,
      }}
    >
      <div className={styles.wrapper}>
        <button className={styles.btnWallet} onClick={disconnectWallet}>
          <Image src="/assets/images/icons/wallet-connect.svg" alt="WalletConnect" width={50} height={50} />
          <span>WalletConnect</span>
        </button>
        <button className={styles.btnWallet} onClick={connectWallet}>
          <Image src="/assets/images/icons/metamask.svg" alt="MetaMask" width={50} height={50} />
          <span>Metamask</span>
        </button>
      </div>
    </CustomModal>
  )
}

export default ConnectWalletModal
