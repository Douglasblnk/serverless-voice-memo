import axios from 'axios';

function getFileContent(recordedBlobs) {
  const currentDate = new Date();

  const { title, data: [blob] } = recordedBlobs;

  const file = new File([blob], currentDate.valueOf(), { type: 'audio/mp3' })

  return {
    title,
    fileType: file.type,
    file,
  }
}

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

export async function saveAudio({ file, fileType, signedUrl }) {
  console.log(`file`, file)
  return axios({
    method: 'PUT',
    url: signedUrl,
    headers: {
      'Content-Type': fileType,
    },
    data: file
  })
}

export async function saveAudioProcess({ recordedBlobs }) {
  try {
    const { title, fileType, file } = getFileContent(recordedBlobs)

    const { data } = await getSignedUrl({ title, fileType })

    const response = await saveAudio({ file, fileType: file.type, signedUrl: data.response })

    console.log(`response`, response)
  } catch (err) {
    console.log(`err saveAudios`, err)
  }
}