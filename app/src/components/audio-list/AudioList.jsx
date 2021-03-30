import styles from './AudioList.module.scss';

import AudioPlayer from '../audio-player/AudioPlayer';
import MusicBeat from '../music-beat/MusicBeat';

export default function AudioList({ recordedBlobs }) {
  return (
    <div className={styles.audioListContainer}>
      {
        recordedBlobs.map((audioBlob, index) => (
          <div key={`audioBlob-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
            Audio Blob { audioBlob.toString() }

            <MusicBeat />
          </div>
        ))
      }
      
    </div>
  );
}