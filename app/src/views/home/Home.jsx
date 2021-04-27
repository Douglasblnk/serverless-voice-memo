import { useState, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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

  const recordedBlobs = useSelector(state => state);
  
  const dispatch = useDispatch()
  
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
      
      addAudioBlobs(audioBlobs)
    });
  }
  
  
  const removeBlob = (index) => {
    const newRecoredBlobsList = recordedBlobs.filter((_, i) => i !== index);
    
    updateAudioBlobs(newRecoredBlobsList)
  }
  
  const addAudioBlobs = audioBlobs => dispatch({ type: 'add', data: audioBlobs });

  const updateAudioBlobs = audioBlobs => dispatch({ type: 'update', data: audioBlobs });

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