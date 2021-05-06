import axios from 'axios';

export async function getAudios() {
  try {

  } catch (err) {
    console.log(`err getAudios`, err)
  }
}

export async function getSignedUrl({ title, fileType }) {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_BASE_URL}/audio`,
    data: {
      title,
      extension: fileType,
    }
  })
}

export async function saveAudio({ blob, fileType, signedUrl }) {
  return axios({
    method: 'PUT',
    url: signedUrl,
    headers: {
      'Content-Type': fileType,
    },
    data: {
      blob
    }
  })
}

export async function saveAudioProcess({ recordedBlobs }) {
  try {
    const { title, data: [blob] } = recordedBlobs;

    const fileType = blob.type

    const { data } = await getSignedUrl({ title, fileType })

    const response = await saveAudio({ blob, fileType, signedUrl: data.response })

    console.log(`response`, response)
  } catch (err) {
    console.log(`err saveAudios`, err)
  }
}