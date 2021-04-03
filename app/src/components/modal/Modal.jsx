import styles from './Modal.module.scss'

export default function Modal(props) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        {
          props.header && (
            <div className={styles.header}>
              { props.header }
            </div>
          )
        }

        {
          props.footer && (
            <div className={styles.footer}>
              { props.footer }
            </div>
          )
        }
      </div>
    </div>
  )
}