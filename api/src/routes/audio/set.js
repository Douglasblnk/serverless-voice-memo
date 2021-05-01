const saveAudio = require('../../services/audio/save-audio');
const { get, getBody } = require('../../utils/utils');

const getParameters = event => {
  const body = getBody(event)

  return {
    audioTitle: get(body, 'title', ''),
    audioExtension: get(body, 'extension', '')
  }
}

const validateParams = ({
  audioTitle,
  audioExtension,
}) => ({
  ...(!audioTitle ? { audioTitle: 'audioTitle not defined' } : ''),
  ...(!audioExtension ? { audioExtension: 'audioTitle not defined' } : '')
})

module.exports.run = async event => {
  try {
    const parameters = getParameters(event);

    const errors = validateParams(parameters)
    if (Object.keys(errors).length) throw new Error('Invalid parameters')

    const response = await saveAudio(parameters);
    console.log(`response`, response)
    return { response }
  } catch (err) {
    console.log(`run set audio`, err)
  }
};
