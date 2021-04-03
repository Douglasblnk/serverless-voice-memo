import styles from './AudioList.module.scss';

import AudioPlayer from '../audio-player/AudioPlayer';

export default function AudioList({ recordedBlobs, removeAudio }) {
  return (
    <div className={styles.audioListContainer}>
      {
        recordedBlobs.map((audioBlob, index) => (
          <div key={`audioBlob-${index}`} className={styles.audioList}>
            <AudioPlayer
              audioBlob={audioBlob}
              audioTitle={`Audio ${index + 1}`}
              audioIndex={index}
              removeAudio={removeAudio}
            />
          </div>
        ))
      }
      
    </div>
  );
}