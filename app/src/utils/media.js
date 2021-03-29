export default async function getAudio() {
  return navigator.mediaDevices.getUserMedia({
    audio: true
  })
}