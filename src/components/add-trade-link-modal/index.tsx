import React from 'react'
import CustomModal from '@components/ui/custom-modal'

import styles from './styles.module.scss'
import cookie from 'js-cookie'

interface AddTradeLinkModalProps {
  isOpen: boolean
  onCloseModal: (e?: any) => void
}

const AddTradeLinkModal = ({ isOpen, onCloseModal }: AddTradeLinkModalProps) => {
  const [valueLink, setValueLink] = React.useState('')
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => setValueLink(e.target.value)
  const handleSaveTradeLink = (e: any) => {
    cookie.set('tradeLink', valueLink)
    onCloseModal(e)
  }
  return (
    <CustomModal
      options={{
        isOpen,
        onRequestClose: onCloseModal
      }}
    >
      <div className={styles.wrapper}>
        <h4 className={styles.addLinkHeader}>You have not added a link to trade steam</h4>
        <input className={styles.input} type="text" value={valueLink} onChange={handleLinkChange} />
        <button onClick={handleSaveTradeLink} className={styles.btn}>Save</button>
      </div>
    </CustomModal>
  )
}

export default AddTradeLinkModal
