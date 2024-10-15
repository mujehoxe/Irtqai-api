/* eslint-disable prettier/prettier */
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './storage.config';

export const UploadFile = () =>
  UseInterceptors(FileInterceptor('file', { storage }));