const AWS = require('aws-sdk');

module.exports = async ({
  audioTitle,
  audioExtension,
}) => {
  const bucketName = await getS3BucketName();

  const s3Params = {
    Bucket: bucketName,
    Key: audioTitle,
    Expires: 30000,
    ContentType: audioExtension,
    ACL: 'public-read'
  };

  const signedUrl = await getSignedUrl(s3Params)

  return signedUrl
}

const getSignedUrl = async params => {
  const s3 = new AWS.S3();

  return s3.getSignedUrl('putObject', params)
}

const getS3BucketName = async () => process.env.bucket_name