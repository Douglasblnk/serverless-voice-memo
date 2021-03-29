import styles from './AudioDots.module.scss'

export default function AudioDots(props) {
  const dotList = ([
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
  ].map((dots, index) =>
    <div
      key={`wrapper-${index.toString()}`}
      className={`${styles.dotsCol} ${props.isActive ? styles.active : ''}`}
    >
      {
        dots.map(number =>
          <div
            key={`dot-${number.toString()}`}
            className={styles.dotsDot}
          />
        )
      }
    </div>
  ))

  return (
    <>{dotList}</>
  );
}