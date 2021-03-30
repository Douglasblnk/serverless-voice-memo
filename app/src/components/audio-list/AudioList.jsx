import styles from './AudioList.module.scss';

import AudioPlayer from '../audio-player/AudioPlayer';

export default function AudioList({ recordedBlobs }) {
  return (
    <div className={styles.audioListContainer}>
      {
        recordedBlobs.map((audioBlob, index) => (
          <div key={`audioBlob-${index}`}>
            Audio Blob { audioBlob.toString() }
            Audio Blob { audioBlob.toString() }
            Audio Blob { audioBlob.toString() }
            Audio Blob { audioBlob.toString() }
          </div>
        ))
      }
      
    </div>
  );
}