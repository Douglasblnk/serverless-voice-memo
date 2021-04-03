import { useState, createRef } from 'react'

import styles from './Home.module.scss'

import getAudio from '../../utils/media';
import { recorder } from '../../utils/recorder';
import { getScale } from '../../utils/utils';

import AudioDots from '../../components/audio-dots/AudioDots';
import RecordButton from '../../components/record-button/RecordButton';
import StopButton from '../../components/stop-button/StopButton';
import AudioList from '../../components/audio-list/AudioList';


export default function Home() {
  const startButtonRef = createRef();
  const stopButtonRef = createRef();
  
  const [startButtonStyle, setStartButtonStyle] = useState({});
  const [svgStyle, setSvgStyle] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState([]);
  
  const onOpen = () => [setupEnv(), onStartRecording()];

  const setupEnv = () => {
    const scale = getScale(startButtonRef.current, stopButtonRef.current);
  
    setStartButtonStyle({ transform: scale });
  
    setSvgStyle({
      transform: 'scale(0.5)',
      opacity: '0%'
    });
      
    setTimeout(() => {
      setIsActive(true);
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
      const audioBlobs = recorder.getBlob();
      
      setRecordedBlobs(previusState => ([ ...previusState, audioBlobs ]));
    });
  }


  const removeBlob = (index) => {
    setRecordedBlobs(currentRecordedBlob => currentRecordedBlob.filter(
      (_, i) => i !== index)
    );
  }

  return (
    <div className={styles.homeContainer}>
      <RecordButton
        onOpen={onOpen}
        startButtonStyle={startButtonStyle}
        startButtonRef={startButtonRef}
        svgStyle={svgStyle}
      />

      <div
        className={`${styles.activeWrapper} ${isActive ? styles.active : ''}`}
        style={isActive ? { backgroundColor: 'rgb(255, 100, 100)' } : {}}
      >
        <StopButton
          stopButtonRef={stopButtonRef}
          onClose={onClose}
        />

        <div className={styles.dots}>
          <AudioDots isActive={isActive} />
        </div>
      </div>

      <AudioList
        recordedBlobs={recordedBlobs}
        removeAudio={removeBlob}
      />
    </div>
  )
}