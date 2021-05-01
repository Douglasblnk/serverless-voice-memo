module.exports = async ({
  audioTitle,
  audioExtension,
}) => {
  const bucketName = await getS3BucketName()
  return bucketName
}

const getS3BucketName = async () => process.env.bucket_name