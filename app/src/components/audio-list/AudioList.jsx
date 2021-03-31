import styles from './AudioList.module.scss';

import AudioPlayer from '../audio-player/AudioPlayer';

export default function AudioList({ recordedBlobs, audioSrc }) {
  return (
    <div className={styles.audioListContainer}>
      {
        recordedBlobs.map((audioBlob, index) => (
          <div key={`audioBlob-${index}`}>
            <AudioPlayer
              audioBlob={audioBlob}
              audioSrc={audioSrc}
              audioTitle={`Audio ${index + 1}`}
            />
          </div>
        ))
      }
      
    </div>
  );
}