/* eslint-disable prettier/prettier */
import { cloudinary } from './cloudinary.config';
export { UploadFile } from './upload.interceptor';

export async function uploadToCloudinary(filePath: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
