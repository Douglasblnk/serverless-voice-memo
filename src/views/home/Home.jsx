import { useState, createRef } from 'react'

import styles from './Home.module.scss'
import AudioDots from '../../components/audio-dots/AudioDots';
import RecordButton from '../../components/record-button/RecordButton';
import StopButton from '../../components/stop-button/StopButton';
import { getScale } from '../../utils/utils';
import getAudio from '../../utils/media';
import { recorder } from '../../utils/recorder';


export default function Home() {
  const startButtonRef = createRef();
  const stopButtonRef = createRef();
  const audio = createRef();
  
  const [startButtonStyle, setStartButtonStyle] = useState({});
  const [svgStyle, setSvgStyle] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  
  const onOpen = () => [setupEnv(), onStartRecording()];

  const setupEnv = () => {
    const scale = getScale(startButtonRef.current, stopButtonRef.current);
  
    setStartButtonStyle({ transform: scale });
  
    setSvgStyle({
      transform: 'scale(0.5)',
      opacity: '0%'
    });
  
    setIsAudioActive(false)
    
    setTimeout(() => {
      transitionEndHandler();
    }, 500);
  }

  const onStartRecording = async () => {
    const audioStream = await getAudio();
    recorder.startRecording(audioStream);
  }

  const onClose = () => {
    setSvgStyle({});
    setStartButtonStyle({});
    setIsActive(false);

    recorder.stopRecording();

    setTimeout(() => {
      const audioURL = recorder.getRecordingURL();

      playAudio(audioURL);
    });
  }

  const playAudio = url => {
    setAudioSrc(url);

    setIsAudioActive(true);
  }

  const transitionEndHandler = () => setIsActive(true);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.wrapper}>
        <div className={styles.buttonWrapper}>
          <RecordButton
            onOpen={onOpen}
            styles={styles}
            startButtonStyle={startButtonStyle}
            startButtonRef={startButtonRef}
            svgStyle={svgStyle}
          />
        </div>

        <div
          className={`${styles.activeWrapper} ${isActive ? styles.active : ''}`}
          style={isActive ? { backgroundColor: 'rgb(255, 100, 100)' } : {}}
        >
          <StopButton
            styles={styles}
            stopButtonRef={stopButtonRef}
            onClose={onClose}
          />

          <div className={styles.dots}>
            <AudioDots isActive={isActive} />
          </div>
        </div>
      </div>

      {
        isAudioActive
          && (
            <div className={styles.logo}>
              <audio
                class={styles.audio}
                ref={audio}
                src={audioSrc}
                muted={false}
                controls
                onLoadedMetadata={() => audio.current.play()}
                
              >
                Seu navegador não suporta a tag <code>audio</code>
              </audio>
            </div>
          )
      }
    </div>
  )
}