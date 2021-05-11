const AWS = require('aws-sdk');

module.exports = async ({
  audioTitle,
  audioExtension,
}) => {
  const s3Params = {
    Bucket: process.env.bucket_name,
    Key: audioTitle,
    Expires: 30000,
    ContentType: audioExtension,
  };

  const signedUrl = await getSignedUrl(s3Params)

  return signedUrl
}

const getSignedUrl = async params => {
  const s3 = new AWS.S3();

  return s3.getSignedUrl('putObject', params)
}