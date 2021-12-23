import React, { ReactElement } from 'react'
import ReactModal from 'react-modal'

import styles from './styles.module.scss'

interface ModalProps {
  children: ReactElement<any, any>
  options: ReactModal.Props
}

const CustomModal = ({ children, options }: ModalProps) => {
  return (
    <ReactModal
      {...options}
      className={styles.modal}
      overlayClassName={styles.overlayModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  )
}

export default CustomModal
