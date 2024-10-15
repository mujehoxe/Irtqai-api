/* eslint-disable prettier/prettier */
import { diskStorage } from 'multer';

import { extname } from 'path';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

const isAudioFile = (file: Express.Multer.File): boolean => {
  const allowedExtensions = ['.wav', '.mp3'];
  const fileExtension = extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(fileExtension);
};

export const storage = diskStorage({
  destination: function (_req, file, cb) {
    console.log(file);

    if (!isAudioFile(file)) {
      return cb(
        new BadRequestException('Only WAV and MP3 audio files are allowed!'),
        null,
      );
    }

    cb(null, 'src/uploads');
  },
  filename: function (_req, file, cb) {
    if (!isAudioFile(file)) {
      return cb(
        new HttpException('Only WAV and MP3 audio files are allowed!', HttpStatus.BAD_REQUEST),
        null,
      );
    }

    cb(null, generateFilename(file.originalname));
  },
});

function generateFilename(fileName: string) {
  return (
    new Date().toISOString().replace(/\//g, '-').replace(/:/g, '-') +
    fileName.trim()
  );
}
