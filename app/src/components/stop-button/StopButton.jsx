import styles from './StopButton.module.scss';

export default function StopButton({
  stopButtonRef,
  onClose
}) {
  return (
    <div
      id="btnStop"
      className={styles.stopButton}
      ref={stopButtonRef}
      onClick={onClose}
    >
      <svg className={styles.stopButtonSvg} viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M6 6h12v12H6z" />
      </svg>
    </div>
  )
}