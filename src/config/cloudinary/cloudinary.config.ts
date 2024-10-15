/* eslint-disable prettier/prettier */
import { v2 as cloudinary } from 'cloudinary';
import { ConfigModule } from '@nestjs/config';

(async () => {
  console.log( process.env.api_secret)
  await ConfigModule.forRoot();
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true,
  });
})();
export { cloudinary };
