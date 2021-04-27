import axios from 'axios';

export async function getAudios() {
  try {

  } catch (err) {
    console.log(`err getAudios`, err)
  }
}

export async function saveAudio({ recordedBlobs }) {
  try {
    const { title, data: [blob] } = recordedBlobs;

    const fileType = blob.type

    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BASE_URL}/audio`,
      data: {
        title,
        extension: fileType,
      }
    })

    console.log(`response`, response)
  } catch (err) {
    console.log(`err saveAudios`, err)
  }
}