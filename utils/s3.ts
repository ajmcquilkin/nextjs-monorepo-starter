import axios from 'axios';
import { createBackendAxiosRequest } from 'store/requests';
import { ImageUploadPayload } from 'types/upload';

const getSignedRequest = async (file: File): Promise<ImageUploadPayload> => {
  const fileName = encodeURIComponent(file.name);
  const { data: { data } } = await createBackendAxiosRequest<ImageUploadPayload>({
    method: 'GET',
    url: `/upload/sign-s3?file-name=${fileName}&file-type=${file.type}`
  });
  return data;
};

const uploadFileToS3 = async (signedRequest: string, file: File, url: string): Promise<string> => {
  await axios({
    method: 'PUT',
    url: signedRequest,
    data: file,
    headers: { 'Content-Type': file.type }
  });
  return url;
};

const uploadImage = async (file: File): Promise<string> => {
  const data = await getSignedRequest(file);
  const hostedUrl = await uploadFileToS3(data.signedRequest, file, data.url);
  return hostedUrl;
};

export default uploadImage;
