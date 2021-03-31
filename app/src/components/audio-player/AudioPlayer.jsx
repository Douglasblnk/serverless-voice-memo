import { createRef, useState } from 'react';
import { FaPlayCircle, FaPauseCircle, FaTrash } from 'react-icons/fa';

import styles from './AudioPlayer.module.scss';

import MusicBeat from '../music-beat/MusicBeat';

export default function AudioPlayer({ audioBlob, audioSrc, audioTitle }) {
  const audio = createRef();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const componentOptions = {
    play: FaPlayCircle,
    pause: FaPauseCircle,
  }

  const IsComponent = componentOptions[isAudioPlaying ? 'pause' : 'play']
  
  return (
    <div className={styles.audioPlayerContainer}>
      <div>
        <IsComponent className={styles.playIcon} style={{ marginRight: '20px' }} />

        <div className={styles.audioTitle}>
          <p>{ audioTitle }</p>
        </div>
      </div>

      <div className={styles.logo}>
        <audio
          className={styles.audio}
          ref={audio}
          src={audioSrc}
          muted={false}
          controls
        >
          Seu navegador não suporta a tag <code>audio</code>
        </audio>
      </div>

      <div style={{ display: 'flex' }}>
        <MusicBeat />

        <FaTrash className={styles.trashIcon} />
      </div>
    </div>
  )
}