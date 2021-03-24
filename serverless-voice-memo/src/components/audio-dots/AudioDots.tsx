import styles from './AudioDots.module.scss'

export default function AudioDots() {
  const dotList = ([
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6],
  ].map((dots, index) =>
    <div
      key={`wrapper-${index.toString()}`}
      className={styles.dotsCol}
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
    <>dotList</>
  );
}