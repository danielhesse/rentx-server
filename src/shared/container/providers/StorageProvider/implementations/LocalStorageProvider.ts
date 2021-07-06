import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageDTO } from '../dtos/IStorageDTO';
import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save({ file, folder }: IStorageDTO): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete({ file, folder }: IStorageDTO): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
