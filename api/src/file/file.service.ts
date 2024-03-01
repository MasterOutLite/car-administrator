import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {FileType} from "@src/file/file-type";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: 'dgklbpona',
  api_key: '888896176426718',
  api_secret: 'a7UvurHDjc9OZlKUW-UCiUnx_Xk'
});

@Injectable()
export class FileService {

  async save(type: FileType, file: Express.Multer.File) {
    return await this.saveOnCloud(type, file);
  }


  async saveOnCloud(type: FileType, file: Express.Multer.File) {
    try {
      // Завантаження файлу на Cloudinary
      const imageAsBase64 = file.buffer.toString('base64');
      const dataURI = `data:text/plain;base64,${imageAsBase64}`;
      const result = await cloudinary.uploader.upload(dataURI, {folder: type});
      // Виведення URL завантаженого файлу
      console.log('Uploaded file URL:', result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async saveOnStorage(type: FileType, file: Express.Multer.File) {
    try {
      //For release
      //const filePath = path.resolve(__dirname, '..', 'static', type);
      //For development
      const filePath = path.resolve(__dirname, '..', '..', 'static', type);
      const fileName = uuid.v4() + '.' + file.originalname.split('.').pop();
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
