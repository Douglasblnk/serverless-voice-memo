import { saveAudioProcess } from "../services/AudioServices"
import store from '../store/index'

export const recorder = {
  audioType: 'audio/webm',
  mediaRecorder: {},
  blobs: {},

  _setup() {
    const options = { mimeType: this.audioType }
    const isSupported = MediaRecorder.isTypeSupported(options.mimeType)

    if (!isSupported) {
      const msg = `the coded: ${options.mimeType} isn't supported!`
      alert(msg)

      throw new Error(msg)
    }

    return options
  },

  startRecording(stream) {
    this.clearRecordedBlobs()
    const options = this._setup()

    this.mediaRecorder = new MediaRecorder(stream, options)

    this.mediaRecorder.onstop = () => saveAudioProcess({ recordedBlobs: this.blobs })

    this.mediaRecorder.ondataavailable = event => {
      if (!event.data || !event.data.size) return

      this.blobs = {
        title: `Audio ${store.getState().length + 1}`,
        data: [event.data],
      }
    }

    this.mediaRecorder.start()
  },

  async stopRecording() {
    if (this.mediaRecorder.state === 'inactive') return

    this.mediaRecorder.stop()
  },

  getRecordingURL(recordedBlobs) {
    const blob = new Blob(recordedBlobs, { type: this.audioType })

    return window.URL.createObjectURL(blob)
  },

  getBlob() {
    return this.blobs;
  },

  clearRecordedBlobs() {
    this.blobs = [];
  },
}