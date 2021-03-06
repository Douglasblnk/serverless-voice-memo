import styles from './RecordButton.module.scss'

export default function RecordButton({
  startButtonRef,
  startButtonStyle,
  svgStyle,
  onOpen,
}) {
  return (
    <div
      id="btnStart"
      ref={startButtonRef}
      className={styles.button}
      style={startButtonStyle}
      onClick={onOpen}
    >
      <svg
        style={svgStyle}
        className={styles.buttonSvg}
        viewBox="0 0 24 24"
      >
        <path
          d="M12 15c1.66 0 2.99-1.34 2.99-3l.01-6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1s-5.3-2.1-5.3-5.1h-1.7c0 3.42 2.72 6.23 6 6.72v3.28h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
        <path d="M0 0h24v24h-24z" fill="none" />
      </svg>
    </div>
  )
}