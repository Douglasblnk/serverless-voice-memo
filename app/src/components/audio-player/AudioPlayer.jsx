import { createRef, useState, useEffect } from 'react';
import { recorder } from '../../utils/recorder';

import {
  FaPlayCircle,
  FaPauseCircle,
  FaTrash,
  FaRegQuestionCircle,
} from 'react-icons/fa';

import styles from './AudioPlayer.module.scss';

import MusicBeat from '../music-beat/MusicBeat';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import reactDom from 'react-dom';

export default function AudioPlayer({
  audioBlob,
  audioTitle,
  audioIndex,
  removeAudio,
}) {
  const audio = createRef();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');

  useEffect(() => {
    const url = recorder.getRecordingURL(audioBlob);

    setAudioSrc(url);
  }, [])


  const componentOptions = {
    play: FaPlayCircle,
    pause: FaPauseCircle,
  }

  const IsComponent = componentOptions[isAudioPlaying ? 'pause' : 'play'];

  const removeAudioConfirm = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying)

    audio.current.onended = () => setIsAudioPlaying(false)

    isAudioPlaying ? audio.current.pause() : audio.current.play()
  }

  const getHeaderSlot = () => (
    <div className={styles.titleWrapper}>
      <FaRegQuestionCircle />
      <h3 className={styles.title}>Deseja remover o áudio?</h3>
      <span>{audioTitle}</span>
    </div>
  );
  
  const getFooterSlot = () => (
    <>
      <Button
        label="Não"
        color="#fe6464"
        onClick={closeModal}
      />

      <Button
        label="Remover"
        color="#5fb5fe"
        onClick={() => [removeAudio(audioIndex), closeModal()]}
      />
    </>
  );
  
  return (
    <div className={styles.audioPlayerContainer}>
      <div>
        <IsComponent
          className={styles.playIcon}
          style={{ marginRight: '20px' }}
          onClick={toggleAudio}
        />

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
        { isAudioPlaying && <MusicBeat /> }

        <FaTrash
          className={styles.trashIcon}
          onClick={removeAudioConfirm}
        />
      </div>

      {
        showModal &&
          reactDom.createPortal(
          <Modal
            header={getHeaderSlot()}
            footer={getFooterSlot()}
            onClose={() => setShowModal(false)}
          />,
          document.getElementById('root')
        )
      }
    </div>
  );
}