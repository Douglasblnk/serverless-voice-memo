import styles from './Button.module.scss';

export default function Button(props) {
  return (
    <div className={styles.buttonContainer}>
      <button style={{ backgroundColor: props.color }} onClick={props.onClick}>
        {props.label} 
      </button>
    </div>
  )
}