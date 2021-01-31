import aws from 'aws-sdk';
import { ImageUploadPayload } from 'types/upload';

export const signS3 = async (fileName: string, fileType: string): Promise<ImageUploadPayload> => {
  const s3 = new aws.S3({ signatureVersion: 'v4', region: 'us-east-2' });

  const s3Params = {
    Bucket: __S3_BUCKET__,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  const data = await s3.getSignedUrlPromise('putObject', s3Params);

  const returnData: ImageUploadPayload = {
    signedRequest: data,
    url: `https://${__S3_BUCKET__}.s3.amazonaws.com/${fileName}`,
  };

  return returnData;
};
